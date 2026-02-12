import mongoose from "mongoose";

const QuizQuestionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    q: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: Number, required: true },
  },
  { _id: false },
);

const GalleryItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    imageUrl: { type: String, required: true },
    caption: { type: String, required: true },
  },
  { _id: false },
);

const ValentineSchema = new mongoose.Schema(
  {
    shareId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    senderName: { type: String, required: true },
    recipientName: { type: String, required: true },
    proposalImageUrl: { type: String },
    videoLink: { type: String },
    loveLetterText: { type: String, required: true },
    coverImageUrl: { type: String },
    quizQuestions: { type: [QuizQuestionSchema], default: [] },
    galleryItems: { type: [GalleryItemSchema], default: [] },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Valentine", ValentineSchema);
