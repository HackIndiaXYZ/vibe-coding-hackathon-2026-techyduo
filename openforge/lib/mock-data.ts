import type {
  ChatMessage,
  FossScanResult,
  Task,
  TeamMember,
} from "@/types";

export const initialTeam: TeamMember[] = [
  {
    id: "alice",
    name: "Alice",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Alice",
    skills: ["React", "TypeScript", "Design"],
  },
  {
    id: "bob",
    name: "Bob",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Bob",
    skills: ["Python", "FastAPI", "ML"],
  },
  {
    id: "charlie",
    name: "Charlie",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Charlie",
    skills: ["DevOps", "Postgres", "Testing"],
  },
];

export const initialChat: ChatMessage[] = [
  {
    id: "msg-1",
    senderId: "alice",
    text: "I found a neat angle for matching learners by study rhythm and timezone.",
    timestamp: "2026-06-09T15:30:00.000Z",
  },
];

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Define AI Study Group Finder user personas",
    status: "done",
    assigneeId: "alice",
  },
  {
    id: "task-2",
    title: "Sketch onboarding questions for study goals",
    status: "done",
    assigneeId: "alice",
  },
  {
    id: "task-3",
    title: "Prototype learner matching score",
    status: "inprogress",
    assigneeId: "bob",
  },
  {
    id: "task-4",
    title: "Create dashboard wireframe",
    status: "inprogress",
    assigneeId: "alice",
  },
  {
    id: "task-5",
    title: "Set up realtime chat channel",
    status: "todo",
    assigneeId: "charlie",
  },
  {
    id: "task-6",
    title: "Design study session reminder flow",
    status: "todo",
    assigneeId: "charlie",
  },
  {
    id: "task-7",
    title: "Collect open-source recommender examples",
    status: "todo",
    assigneeId: "bob",
  },
  {
    id: "task-8",
    title: "Draft hackathon demo script",
    status: "todo",
    assigneeId: "alice",
  },
];

export const mockFossScan: FossScanResult = {
  score: 82,
  secretsFound: 0,
  hasLicense: true,
  readmeQuality: 74,
  contributingExists: false,
};

export const communityMembers: TeamMember[] = [
  {
    id: "maya",
    name: "Maya",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Maya",
    skills: ["UX Research", "Figma", "Accessibility"],
  },
  {
    id: "nolan",
    name: "Nolan",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Nolan",
    skills: ["Next.js", "Prisma", "Auth"],
  },
  {
    id: "isha",
    name: "Isha",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Isha",
    skills: ["Python", "NLP", "Data"],
  },
  {
    id: "leo",
    name: "Leo",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Leo",
    skills: ["Go", "Kubernetes", "Security"],
  },
  {
    id: "zara",
    name: "Zara",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=Zara",
    skills: ["Community", "Docs", "Testing"],
  },
];
