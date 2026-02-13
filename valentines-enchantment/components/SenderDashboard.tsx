import React, { useEffect, useMemo, useState } from "react";
import ProposalCard from "./ProposalCard";
import WishCard from "./WishCard";
import GiftMenuCard from "./GiftMenuCard";
import QuizCard from "./QuizCard";
import LetterCard from "./LetterCard";
import GalleryCard from "./GalleryCard";
import VideoCard from "./VideoCard";
import ForeverCard from "./ForeverCard";
import {
  createUser,
  createValentine,
  getUserValentines,
  uploadImage,
} from "../services/apiService";
import {
  GalleryItem,
  QuizQuestion,
  UserProfile,
  ValentineData,
} from "../types";
import { Link, Links } from "react-router-dom";

const LOCAL_PROFILE_KEY = "valentine_sender_profile";

const generateId = () => {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
};

type PreviewView =
  | "proposal"
  | "wish"
  | "gift-menu"
  | "quiz"
  | "letter"
  | "gallery"
  | "video"
  | "forever";

const SenderDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [valentines, setValentines] = useState<ValentineData[]>([]);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [proposalImageUrl, setProposalImageUrl] = useState<string | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const [loveLetterText, setLoveLetterText] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [questionText, setQuestionText] = useState("");
  const [questionOptions, setQuestionOptions] = useState(["", "", "", ""]);
  const [questionAnswer, setQuestionAnswer] = useState(0);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryCaption, setGalleryCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewView, setPreviewView] = useState<PreviewView>("proposal");
  const [requestLoading, setRequestLoading] = useState(false);
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);

  const paymentContact = "8951787715";

  const buildPayload = () => ({
    senderName,
    recipientName,
    proposalImageUrl: proposalImageUrl || undefined,
    videoLink: videoLink || undefined,
    loveLetterText,
    coverImageUrl: coverImageUrl || undefined,
    quizQuestions: questions,
    galleryItems,
  });

  const profileId = useMemo(() => profile?.userId || "", [profile]);

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (!raw) return;
    try {
      const stored: any = JSON.parse(raw);
      // Normalize profile - handle both _id and userId
      const normalizedProfile: UserProfile = {
        userId: stored.userId || stored._id,
        name: stored.name,
        email: stored.email,
        createdAt:
          typeof stored.createdAt === "string"
            ? new Date(stored.createdAt).getTime()
            : stored.createdAt || Date.now(),
      };
      setProfile(normalizedProfile);
    } catch {
      localStorage.removeItem(LOCAL_PROFILE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!profileId) return;
    setLoading(true);
    getUserValentines(profileId)
      .then(setValentines)
      .catch((err) => setError(err.message || "Failed to load valentines"))
      .finally(() => setLoading(false));
  }, [profileId]);

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const created = await createUser({ name, email });
      setProfile(created);
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(created));
    } catch (err: any) {
      setError(err.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = () => {
    if (!questionText.trim()) return;
    if (questionOptions.some((opt) => !opt.trim())) return;
    const newQuestion: QuizQuestion = {
      id: generateId(),
      q: questionText.trim(),
      options: questionOptions.map((opt) => opt.trim()),
      answer: questionAnswer,
    };
    setQuestions((prev) => [...prev, newQuestion]);
    setQuestionText("");
    setQuestionOptions(["", "", "", ""]);
    setQuestionAnswer(0);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleImageUpload = async (files: FileList) => {
    setUploading(true);
    setError(null);
    try {
      const uploaded: GalleryItem[] = [];
      for (const file of Array.from(files)) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read image"));
          reader.readAsDataURL(file);
        });
        const result = await uploadImage({
          imageBase64: base64,
          name: file.name,
        });
        uploaded.push({
          id: generateId(),
          imageUrl: result.url,
          caption: galleryCaption || "Sweet memory",
        });
      }
      setGalleryItems((prev) => [...prev, ...uploaded]);
      setGalleryCaption("");
    } catch (err: any) {
      setError(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCoverUpload = async (file: File) => {
    setCoverUploading(true);
    setError(null);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read image"));
        reader.readAsDataURL(file);
      });
      const result = await uploadImage({
        imageBase64: base64,
        name: file.name,
      });
      setCoverImageUrl(result.url);
    } catch (err: any) {
      setError(err.message || "Cover image upload failed");
    } finally {
      setCoverUploading(false);
    }
  };

  const handleProposalImageUpload = async (file: File) => {
    setCoverUploading(true);
    setError(null);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read image"));
        reader.readAsDataURL(file);
      });
      const result = await uploadImage({
        imageBase64: base64,
        name: file.name,
      });
      setProposalImageUrl(result.url);
    } catch (err: any) {
      setError(err.message || "Proposal image upload failed");
    } finally {
      setCoverUploading(false);
    }
  };

  const handleCreateValentine = async (e: React.FormEvent) => {
    e.preventDefault();
    setPreviewView("proposal");
    setShowPreview(true);
  };

  const resetForm = () => {
    setSenderName("");
    setRecipientName("");
    setProposalImageUrl(null);
    setVideoLink("");
    setLoveLetterText("");
    setCoverImageUrl(null);
    setQuestions([]);
    setGalleryItems([]);
  };

  const handleRequestShareLink = async () => {
    if (!profileId) {
      setError("Please create a profile first");
      return;
    }
    setError(null);
    try {
      // Check which fields are missing
      const missingFields = [];
      if (!senderName) missingFields.push("Sender Name");
      if (!recipientName) missingFields.push("Valentine Name");
      if (!loveLetterText) missingFields.push("Love Letter");

      if (missingFields.length > 0) {
        throw new Error(
          `Please fill required fields: ${missingFields.join(", ")}`,
        );
      }
      setShowPaymentPrompt(true);
    } catch (err: any) {
      setError(err.message || "Request failed");
    }
  };

  const submitShareRequest = async () => {
    if (!profileId) return;
    setError(null);
    setRequestLoading(true);
    const payload = buildPayload();
    try {
      const created = await createValentine({
        userId: profileId,
        data: payload,
      });
      setValentines((prev) => [created, ...prev]);
      const link = `${window.location.origin}/?share=${created.shareId}`;
      setShareLink(link);
      resetForm();
      setShowPreview(false);
      setShowPaymentPrompt(false);
    } catch (err: any) {
      setError(err.message || "Failed to submit request");
    } finally {
      setRequestLoading(false);
    }
  };

  const handleResetProfile = () => {
    localStorage.removeItem(LOCAL_PROFILE_KEY);
    setProfile(null);
    setValentines([]);
  };

  const previewValentine: ValentineData = {
    shareId: "preview",
    userId: profileId || "preview",
    ...buildPayload(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    status: "pending",
  };

  if (!profile) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-2xl border-4 border-rose-200 max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-romantic font-bold text-rose-600 mb-4 sm:mb-6 text-center">
          Create Sender Profile
        </h2>
        <form onSubmit={handleCreateProfile} className="space-y-4 sm:space-y-6">
          <input
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-base min-h-10 sm:min-h-12"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-base min-h-10 sm:min-h-12"
            placeholder="Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:bg-rose-600 active:bg-rose-700 transition-all min-h-10 sm:min-h-12 text-base"
          >
            {loading ? "Creating..." : "Start Creating"}
          </button>
        </form>
        {error && (
          <p className="mt-3 sm:mt-4 text-rose-600 text-center text-sm sm:text-base">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-[2rem] shadow-xl border-2 border-rose-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <Link
              to="/admin"
              className="text-rose-500 underline hover:text-rose-600 text-sm mb-4 inline-block"
            >
              .
            </Link>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-romantic font-bold text-rose-600">
              Welcome, {profile.name}
            </h2>
            <p className="text-rose-400 text-sm sm:text-base">
              Create a new Valentine and share it instantly.
            </p>
          </div>
          <button
            onClick={handleResetProfile}
            className="text-rose-500 border border-rose-300 px-3 sm:px-4 py-2 rounded-full hover:bg-rose-50 active:bg-rose-100 transition-colors text-sm sm:text-base min-h-9 sm:min-h-10"
          >
            Switch Sender
          </button>
        </div>
      </div>

      <form
        onSubmit={handleCreateValentine}
        className="bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-[2rem] shadow-2xl border-2 border-rose-100 space-y-4 sm:space-y-6"
      >
        <h3 className="text-2xl sm:text-3xl font-romantic font-bold text-rose-600">
          Create a New Valentine
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <input
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-base min-h-10 sm:min-h-12"
            placeholder="Sender Name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder="Your Valentine Name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            required
          />
        </div>
        <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100 space-y-3">
          <h4 className="text-2xl font-romantic text-rose-600">
            Proposal Image
          </h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleProposalImageUpload(file);
            }}
          />
          {coverUploading && (
            <p className="text-rose-500">Uploading proposal image...</p>
          )}
          {proposalImageUrl && (
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-rose-100">
              <img
                src={proposalImageUrl}
                alt="Proposal"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => setProposalImageUrl(null)}
                className="text-rose-500"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <input
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder="Video Link (optional)"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <p className="text-xs text-rose-400">
            💡 Supported: YouTube, Vimeo, Daily Motion, or any direct video link
          </p>
        </div>
        <textarea
          className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
          placeholder="Love Letter (write your message)"
          value={loveLetterText}
          onChange={(e) => setLoveLetterText(e.target.value)}
          required
        />

        <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100 space-y-3">
          <h4 className="text-2xl font-romantic text-rose-600">
            Forever Image
          </h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleCoverUpload(file);
            }}
          />
          {coverUploading && (
            <p className="text-rose-500">Uploading cover image...</p>
          )}
          {coverImageUrl && (
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-rose-100">
              <img
                src={coverImageUrl}
                alt="Forever cover"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => setCoverImageUrl(null)}
                className="text-rose-500"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100 space-y-4">
          <h4 className="text-2xl font-romantic text-rose-600">
            Quiz Questions
          </h4>
          <input
            className="w-full px-4 py-2 rounded-xl border border-rose-200"
            placeholder="Question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {questionOptions.map((opt, idx) => (
              <input
                key={idx}
                className="w-full px-4 py-2 rounded-xl border border-rose-200"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => {
                  const updated = [...questionOptions];
                  updated[idx] = e.target.value;
                  setQuestionOptions(updated);
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="text-rose-500 font-semibold">
              Correct Answer
            </label>
            <select
              className="px-3 py-2 rounded-xl border border-rose-200"
              value={questionAnswer}
              onChange={(e) => setQuestionAnswer(Number(e.target.value))}
            >
              {questionOptions.map((_, idx) => (
                <option key={idx} value={idx}>{`Option ${idx + 1}`}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={addQuestion}
              className="bg-rose-500 text-white px-4 py-2 rounded-full"
            >
              Add Question
            </button>
          </div>
          {questions.length > 0 && (
            <div className="space-y-2">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between bg-white p-3 rounded-xl border border-rose-100"
                >
                  <div>
                    <p className="font-semibold text-rose-600">{q.q}</p>
                    <p className="text-sm text-rose-400">
                      Answer: {q.options[q.answer]}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQuestion(q.id)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100 space-y-4">
          <h4 className="text-2xl font-romantic text-rose-600">
            Gallery Images
          </h4>
          <input
            className="w-full px-4 py-2 rounded-xl border border-rose-200"
            placeholder="Caption"
            value={galleryCaption}
            onChange={(e) => setGalleryCaption(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) handleImageUpload(files);
            }}
          />
          {uploading && <p className="text-rose-500">Uploading image...</p>}
          {galleryItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-xl border border-rose-100 flex items-center gap-3"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-rose-500 font-semibold">
                      {item.caption}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(item.id)}
                    className="text-rose-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:bg-rose-600 active:bg-rose-700 transition-all min-h-10 sm:min-h-12 text-sm sm:text-base"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={handleRequestShareLink}
            className="w-full bg-emerald-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:bg-emerald-600 active:bg-emerald-700 transition-all min-h-10 sm:min-h-12 text-sm sm:text-base"
          >
            Request Share Link
          </button>
        </div>

        {shareLink && (
          <div className="bg-rose-100 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center">
            <p className="text-rose-600 font-semibold mb-2 text-sm sm:text-base">
              Share link pending approval
            </p>
            <p className="text-rose-500 break-all text-sm sm:text-base">
              Locked until approved
            </p>
            <p className="text-rose-400 text-sm mt-2">
              We will activate this link after payment confirmation.
            </p>
          </div>
        )}

        {error && <p className="text-rose-600 text-center">{error}</p>}
      </form>

      {showPaymentPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-rose-100">
            <h3 className="text-2xl font-romantic font-bold text-rose-600 mb-3">
              Valentine’s Special Offer 💝
            </h3>

            <p className="text-rose-500 leading-relaxed">
              To activate your share link, please complete the payment of{" "}
              <span className="font-semibold text-rose-600">₹149</span> as part
              of our exclusive Valentine’s Day offer. Kindly contact{" "}
              <span className="font-semibold">{paymentContact}</span> for
              payment details.
            </p>

            <p className="text-rose-400 text-sm mt-3">
              Once the payment is completed, please submit your request below.
              Our team will review and approve it at the earliest.
            </p>
            <Link
              to="/about"
              className="text-rose-500 underline hover:text-rose-600 cursor-pointer"
            >
              About us
            </Link>
            <div className="mt-6 flex flex-col md:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowPaymentPrompt(false)}
                className="w-full border border-rose-200 text-rose-500 py-2 rounded-xl hover:bg-rose-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={submitShareRequest}
                disabled={requestLoading}
                className="w-full bg-rose-500 text-white py-2 rounded-xl font-semibold hover:bg-rose-600"
              >
                {requestLoading
                  ? "Submitting..."
                  : "I’ve Completed the Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
      {shareLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-2xl border border-rose-100">
            <div className="text-center">
              <h3 className="text-3xl font-romantic font-bold text-rose-600 mb-2">
                ✨ Success! ✨
              </h3>
              <p className="text-rose-500 mb-6">
                Your Valentine share link has been created!
              </p>
            </div>

            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 mb-6">
              <p className="text-xs text-rose-400 mb-2 uppercase font-semibold">
                Share this link:
              </p>
              <p className="text-rose-600 font-mono text-sm break-all mb-3">
                {shareLink}
              </p>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(shareLink)}
                className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 font-semibold"
              >
                Copy to Clipboard
              </button>
            </div>

            <p className="text-rose-400 text-sm text-center mb-6">
              Your link will be active once approved by our team. You can also
              view it in your Valentines list below.
            </p>

            <button
              type="button"
              onClick={() => setShareLink(null)}
              className="w-full bg-rose-500 text-white py-2 rounded-lg sm:rounded-xl font-semibold hover:bg-rose-600 active:bg-rose-700 transition-colors text-sm sm:text-base min-h-10 sm:min-h-11"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
      {showPreview && (
        <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-[2rem] shadow-2xl border-2 border-rose-100 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl sm:text-2xl font-romantic font-bold text-rose-600">
              Recipient Preview
            </h3>
            <button
              onClick={() => setShowPreview(false)}
              className="text-rose-400 hover:text-rose-600 transition-colors font-bold p-1"
            >
              ✕
            </button>
          </div>
          <div className="bg-rose-50 p-3 sm:p-4 rounded-lg sm:rounded-2xl border border-rose-100">
            <p className="text-rose-600 font-semibold mb-2 text-sm sm:text-base">
              Share link (pending)
            </p>
            <p className="text-rose-400 text-xs sm:text-sm">
              This link will unlock after approval.
            </p>
          </div>
          <div className="space-y-4">
            {previewView === "proposal" && (
              <ProposalCard
                onAccept={() => setPreviewView("wish")}
                customMessage={previewValentine.proposalMessage}
                senderName={previewValentine.senderName}
                recipientName={previewValentine.recipientName}
                imageUrl={previewValentine.proposalImageUrl}
              />
            )}
            {previewView === "wish" && (
              <WishCard
                onSeeGift={() => setPreviewView("gift-menu")}
                customMessage={previewValentine.wishMessage}
              />
            )}
            {previewView === "gift-menu" && (
              <GiftMenuCard
                onOpenQuiz={() => setPreviewView("quiz")}
                onOpenLetter={() => setPreviewView("letter")}
                onOpenGallery={() => setPreviewView("gallery")}
                onOpenVideo={() => setPreviewView("video")}
                hasVideo={Boolean(previewValentine.videoLink)}
                onFinally={() => setPreviewView("forever")}
              />
            )}
            {previewView === "quiz" && (
              <QuizCard
                onBack={() => setPreviewView("gift-menu")}
                questions={previewValentine.quizQuestions}
              />
            )}
            {previewView === "letter" && (
              <LetterCard
                onBack={() => setPreviewView("gift-menu")}
                customLetter={previewValentine.loveLetterText}
              />
            )}
            {previewView === "gallery" && (
              <GalleryCard
                onBack={() => setPreviewView("gift-menu")}
                items={previewValentine.galleryItems}
              />
            )}
            {previewView === "video" && previewValentine.videoLink && (
              <VideoCard
                onBack={() => setPreviewView("gift-menu")}
                videoLink={previewValentine.videoLink}
              />
            )}
            {previewView === "forever" && (
              <ForeverCard imageUrl={previewValentine.coverImageUrl} />
            )}
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-[2rem] shadow-xl border-2 border-rose-100">
        <h3 className="text-xl sm:text-2xl font-romantic font-bold text-rose-600 mb-3 sm:mb-4">
          Your Valentines
        </h3>
        {loading && (
          <p className="text-rose-400 text-sm sm:text-base">Loading...</p>
        )}
        {valentines.length === 0 && !loading && (
          <p className="text-rose-400 text-sm sm:text-base">
            No valentines yet.
          </p>
        )}
        <div className="space-y-2 sm:space-y-3">
          {valentines.map((v) => (
            <div
              key={v.shareId}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-rose-100"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-rose-600 text-sm sm:text-base truncate">
                  {v.recipientName}
                </p>
                <p className="text-rose-400 text-xs sm:text-sm">
                  From {v.senderName}
                </p>
                <p className="text-rose-400 text-xs sm:text-sm">
                  Status:{" "}
                  <span
                    className={
                      v.status === "approved"
                        ? "text-green-500 font-semibold"
                        : "text-yellow-500 font-semibold"
                    }
                  >
                    {v.status || "pending"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                {v.status === "approved" ? (
                  <>
                    <a
                      href={`/?share=${v.shareId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-rose-500 hover:text-rose-600 underline font-semibold text-sm min-h-9 flex items-center"
                    >
                      Open
                    </a>
                    <button
                      type="button"
                      className="text-rose-500 hover:text-rose-600 underline font-semibold text-sm min-h-9 flex items-center"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${window.location.origin}/?share=${v.shareId}`,
                        )
                      }
                    >
                      Copy Link
                    </button>
                  </>
                ) : (
                  <span className="text-rose-300 text-xs sm:text-sm font-semibold">
                    Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SenderDashboard;
