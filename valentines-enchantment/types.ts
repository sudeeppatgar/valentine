
export interface LoveLetterConfig {
  recipient: string;
  tone: 'passionate' | 'sweet' | 'funny' | 'poetic';
  details: string;
}

export interface GeneratedLetter {
  content: string;
  timestamp: number;
}

export interface QuizQuestion {
  id: string;
  q: string;
  options: string[];
  answer: number;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface ValentineData {
  shareId: string;
  userId: string;
  senderName: string;
  recipientName: string;
  proposalMessage: string;
  proposalImageUrl?: string;
  wishMessage: string;
  videoLink?: string;
  loveLetterText: string;
  coverImageUrl?: string;
  quizQuestions: QuizQuestion[];
  galleryItems: GalleryItem[];
  status?: "pending" | "approved" | "rejected";
  createdAt: number;
  updatedAt: number;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  createdAt: number;
}
