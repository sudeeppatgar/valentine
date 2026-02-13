import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ProposalCard from "./components/ProposalCard";
import WishCard from "./components/WishCard";
import GiftMenuCard from "./components/GiftMenuCard";
import QuizCard from "./components/QuizCard";
import LetterCard from "./components/LetterCard";
import GalleryCard from "./components/GalleryCard";
import ForeverCard from "./components/ForeverCard";
import FloatingHearts from "./components/FloatingHearts";
import VideoCard from "./components/VideoCard";
import SenderDashboard from "./components/SenderDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AboutPage from "./components/AboutPage";
import { getValentine } from "./services/apiService";
import { ValentineData } from "./types";

// Valentine View - Displays a single valentine with navigation between states
const ValentineView: React.FC = () => {
  const { shareId, view } = useParams<{ shareId: string; view?: string }>();
  const navigate = useNavigate();
  const [valentine, setValentine] = useState<ValentineData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!shareId) return;
    setLoading(true);
    getValentine(shareId)
      .then((data) => setValentine(data))
      .catch((err) => setLoadError(err.message || "Failed to load valentine"))
      .finally(() => setLoading(false));
  }, [shareId]);

  const navigateTo = (viewName: string) => {
    navigate(`/valentine/${shareId}/${viewName}`);
  };

  const currentView = view || "proposal";

  return (
    <div className="relative min-h-screen bg-[#fff1f2] flex items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden selection:bg-rose-200">
      <FloatingHearts />

      <div className="w-full max-w-4xl z-10">
        {loading && (
          <div className="bg-white/90 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-[2rem] shadow-2xl text-center">
            <p className="text-rose-500 text-base sm:text-lg md:text-xl">
              Loading your Valentine...
            </p>
          </div>
        )}
        {loadError && (
          <div className="bg-white/90 p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-[2rem] shadow-2xl text-center">
            <p className="text-rose-500 text-base sm:text-lg md:text-xl">
              {loadError}
            </p>
          </div>
        )}
        {!loading && !loadError && (
          <>
            {currentView === "proposal" && (
              <ProposalCard
                onAccept={() => navigateTo("wish")}
                customMessage={valentine?.proposalMessage}
                senderName={valentine?.senderName}
                recipientName={valentine?.recipientName}
                imageUrl={valentine?.proposalImageUrl}
              />
            )}

            {currentView === "wish" && (
              <WishCard
                onSeeGift={() => navigateTo("gift-menu")}
                customMessage={valentine?.recipientName}
              />
            )}

            {currentView === "gift-menu" && (
              <GiftMenuCard
                onOpenQuiz={() => navigateTo("quiz")}
                onOpenLetter={() => navigateTo("letter")}
                onOpenGallery={() => navigateTo("gallery")}
                onOpenVideo={() => navigateTo("video")}
                hasVideo={Boolean(valentine?.videoLink)}
                onFinally={() => navigateTo("forever")}
              />
            )}

            {currentView === "quiz" && (
              <QuizCard
                onBack={() => navigateTo("gift-menu")}
                questions={valentine?.quizQuestions}
              />
            )}

            {currentView === "letter" && (
              <LetterCard
                onBack={() => navigateTo("gift-menu")}
                customLetter={valentine?.loveLetterText}
              />
            )}

            {currentView === "gallery" && (
              <GalleryCard
                onBack={() => navigateTo("gift-menu")}
                items={valentine?.galleryItems}
              />
            )}

            {currentView === "video" && valentine?.videoLink && (
              <VideoCard
                onBack={() => navigateTo("gift-menu")}
                videoLink={valentine.videoLink}
              />
            )}

            {currentView === "forever" && (
              <ForeverCard imageUrl={valentine?.coverImageUrl} />
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .doll-anim {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .card-enter {
          animation: slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 640px) {
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        }
      `}</style>
    </div>
  );
};

// Home/Sender Dashboard
const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const share = params.get("share");
    if (share) {
      navigate(`/valentine/${share}`);
    }
  }, [location.search, navigate]);

  return (
    <div className="relative min-h-screen bg-[#fff1f2] flex items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden selection:bg-rose-200">
      <FloatingHearts />
      <div className="w-full max-w-5xl z-10">
        <SenderDashboard />
      </div>
    </div>
  );
};

// Admin Dashboard
const Admin: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#fff1f2] flex items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden selection:bg-rose-200">
      <FloatingHearts />
      <div className="w-full max-w-5xl z-10">
        <AdminDashboard />
      </div>
    </div>
  );
};

// About Page
const About: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#fff1f2] flex items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden selection:bg-rose-200">
      <FloatingHearts />
      <div className="w-full max-w-5xl z-10">
        <AboutPage />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/about" element={<About />} />
      <Route path="/valentine/:shareId" element={<ValentineView />} />
      <Route path="/valentine/:shareId/:view" element={<ValentineView />} />
    </Routes>
  );
};

export default App;
