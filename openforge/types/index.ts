export interface Repo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  stars: number;
  language: string | null;
  license: string | null;
  url: string;
}

export interface GapAnalysis {
  uniqueAngle: string;
  improvements: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
  skills: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ReviewReply {
  id: string;
  authorId: string;
  text: string;
  timestamp: string;
}

export interface Review {
  id: string;
  authorId: string;
  text: string;
  timestamp: string;
  replies: ReviewReply[];
}

export interface Task {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "done";
  assigneeId: string;
  description: string;
  aiHelp: string;
}

export interface FossScanResult {
  score: number;
  secretsFound: number;
  hasLicense: boolean;
  readmeQuality: number;
  contributingExists: boolean;
}

export interface CleanCodeDiff {
  before: string;
  after: string;
}
