// types.ts

// Define a type for the Question model
export interface Question {
  id: number;
  question: string;
  chapter:number;
  chapterName:string;
  subject: string;
  options: string[];
  answer: string;
  explanation: string;
  createdAt: Date;
  images: string[]; // Add this line to include images
  startDate: Date
  active: boolean
  endDate: Date
  // quizId: number;
  // quiz: Quiz;
}

// Define a type for the FormData structure
export interface formData {
  subject: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  images: string[]; // Add this line to include images
}

