import type {
  ChatMessage,
  FossScanResult,
  Task,
  TeamMember,
} from "@/types";

function baseTask(
  id: string,
  title: string,
  assigneeId: string,
  description: string,
  aiHelp: string,
): Task {
  return {
    id,
    title,
    status: "todo",
    assigneeId,
    description,
    aiHelp,
  };
}

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

export const initialReviews = [
  {
    id: "review-1",
    authorId: "alice",
    text: "This hackathon taught me how fast we can iterate on a core study group matching flow. The pain point was balancing speed with product polish, especially when we had to keep feature work from slowing down the UI.",
    timestamp: "2026-06-09T17:45:00.000Z",
    replies: [
      {
        id: "reply-1",
        authorId: "bob",
        text: "Great reflection, Alice. I agree the matching logic needed extra attention, and I appreciated how you kept the onboarding flow lean.",
        timestamp: "2026-06-09T18:10:00.000Z",
      },
    ],
  },
  {
    id: "review-2",
    authorId: "bob",
    text: "I learned a lot about making data-driven feature choices during the MVP vote. The most painful part was narrowing down ideas into a coherent roadmap while still keeping the app accessible.",
    timestamp: "2026-06-09T17:55:00.000Z",
    replies: [],
  },
  {
    id: "review-3",
    authorId: "charlie",
    text: "The theme handling and collaborative sprint process were the most interesting parts. I liked that we could pivot quickly from ideation to deployment, but we also had to keep a close eye on technical debt.",
    timestamp: "2026-06-09T18:05:00.000Z",
    replies: [],
  },
];

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Define AI Study Group Finder user personas",
    status: "done",
    assigneeId: "alice",
    description: "Capture learner goals, pain points, and group matching criteria.",
    aiHelp: "Focus on key student types: weekend learners, exam crammers, and peer tutors.",
  },
  {
    id: "task-2",
    title: "Sketch onboarding questions for study goals",
    status: "done",
    assigneeId: "alice",
    description: "Map the onboarding funnel for study preferences and availability.",
    aiHelp: "Ask about subject, preferred pace, time zones, and collaboration style.",
  },
  {
    id: "task-3",
    title: "Prototype learner matching score",
    status: "inprogress",
    assigneeId: "bob",
    description: "Build a scoring model for study group compatibility.",
    aiHelp: "Use weights for topic fit, time overlap, study habits, and experience level.",
  },
  {
    id: "task-4",
    title: "Create dashboard wireframe",
    status: "inprogress",
    assigneeId: "alice",
    description: "Design the student dashboard for upcoming sessions and matches.",
    aiHelp: "Prioritize quick actions, session reminders, and recommended groups.",
  },
  {
    id: "task-5",
    title: "Set up realtime chat channel",
    status: "todo",
    assigneeId: "charlie",
    description: "Prepare the chat experience for instant study group communication.",
    aiHelp: "Use simple messaging UI, online presence indicators, and quick replies.",
  },
  {
    id: "task-6",
    title: "Design study session reminder flow",
    status: "todo",
    assigneeId: "charlie",
    description: "Plan scheduled reminders and calendar sync for group sessions.",
    aiHelp: "Include push/email reminders and a reschedule option for absentees.",
  },
  {
    id: "task-7",
    title: "Collect open-source recommender examples",
    status: "todo",
    assigneeId: "bob",
    description: "Research community apps and recommender systems for study groups.",
    aiHelp: "Look for collaborative learning platforms that match based on interests.",
  },
  {
    id: "task-8",
    title: "Draft hackathon demo script",
    status: "todo",
    assigneeId: "alice",
    description: "Outline the product walkthrough and main value props.",
    aiHelp: "Highlight how the app finds peers, schedules sessions, and reduces study friction.",
  },
];

function tasksForStack(stackName: string): Task[] {
  switch (stackName) {
    case "Speed-Optimal":
      return [
        baseTask(
          "task-1",
          "Initialize Next.js app",
          "alice",
          "Set up a Next.js project with Tailwind CSS and Supabase integration.",
          "Run create-next-app, install Tailwind, and configure Supabase keys in .env.",
        ),
        baseTask(
          "task-2",
          "Configure Supabase auth and DB",
          "bob",
          "Create Supabase tables for study groups, users, and matching metadata.",
          "Use Supabase Auth for login and define the schema for sessions and members.",
        ),
        baseTask(
          "task-3",
          "Build responsive dashboard",
          "alice",
          "Use Tailwind to create a fast, mobile-friendly study dashboard.",
          "Focus on cards for matched groups, upcoming sessions, and action buttons.",
        ),
        baseTask(
          "task-4",
          "Implement matching logic",
          "bob",
          "Use Supabase queries to match learners by time, subject, and skill level.",
          "Compute a compatibility score and rank groups in real time.",
        ),
        baseTask(
          "task-5",
          "Add real-time chat",
          "charlie",
          "Connect Supabase Realtime or Edge functions for instant group messaging.",
          "Keep the chat UI simple and sync messages as students collaborate.",
        ),
        baseTask(
          "task-6",
          "Set up deployment pipeline",
          "charlie",
          "Prepare Vercel deployment and environment variables for Supabase.",
          "Verify build output, preview URLs, and production env setup.",
        ),
        baseTask(
          "task-7",
          "Add analytics and logging",
          "bob",
          "Track user sessions and study group usage with lightweight analytics.",
          "Use simple logging for errors and study session creation events.",
        ),
        baseTask(
          "task-8",
          "Create onboarding flow",
          "alice",
          "Write the flow for new students to describe goals and join groups.",
          "Guide users through preferences, availability, and group interests.",
        ),
      ];
    case "FOSS-Friendly":
      return [
        baseTask(
          "task-1",
          "Initialize T3 stack",
          "alice",
          "Create a T3 stack project with Next.js, tRPC, Prisma, and Tailwind.",
          "Scaffold the app, add auth, and configure the Postgres database.",
        ),
        baseTask(
          "task-2",
          "Define Prisma schema",
          "bob",
          "Model users, study groups, and match preferences for open source data.",
          "Use Prisma migrations and seed data for contributor-friendly setup.",
        ),
        baseTask(
          "task-3",
          "Build OSS onboarding docs",
          "alice",
          "Create README and contributing guides for open-source collaborators.",
          "Explain how to run the app locally, contribute, and open issues.",
        ),
        baseTask(
          "task-4",
          "Implement group matching API",
          "bob",
          "Use tRPC to expose matching endpoints for the study group finder.",
          "Keep the API type-safe and easy to extend by community members.",
        ),
        baseTask(
          "task-5",
          "Set up CI/CD",
          "charlie",
          "Add GitHub Actions for tests, linting, and deployments.",
          "Run a simple workflow on push and protect main branch with checks.",
        ),
        baseTask(
          "task-6",
          "Configure database migrations",
          "charlie",
          "Ensure Postgres schema changes are versioned with Prisma.",
          "Use migrations, seed scripts, and a local developer reset flow.",
        ),
        baseTask(
          "task-7",
          "Launch open-source docs",
          "bob",
          "Publish docs for contributors, maintainer expectations, and issue labels.",
          "Add examples showing how to extend matching and add new views.",
        ),
        baseTask(
          "task-8",
          "Prepare release notes",
          "alice",
          "Write the first release summary and community announcement.",
          "Include tech stack details, features, and next steps for contributors.",
        ),
      ];
    case "Learning-Focused":
      return [
        baseTask(
          "task-1",
          "Scaffold Astro + Deno KV app",
          "alice",
          "Create the learning platform shell with Astro and Deno KV storage.",
          "Set up routes, content pages, and a simple Deno KV backend.",
        ),
        baseTask(
          "task-2",
          "Build learning content pages",
          "bob",
          "Design pages for courses, study materials, and community resources.",
          "Use Astro components that render quickly and support rich content.",
        ),
        baseTask(
          "task-3",
          "Implement study matching",
          "charlie",
          "Store learner profiles in Deno KV and match by subject and schedule.",
          "Create a lightweight matching function that filters by keywords and availability.",
        ),
        baseTask(
          "task-4",
          "Add user settings",
          "alice",
          "Let learners save preferences, study goals, and notification options.",
          "Persist settings in KV and surface them in a profile page.",
        ),
        baseTask(
          "task-5",
          "Create analytics dashboard",
          "bob",
          "Visualize student engagement and course completion rates.",
          "Add charts for active learners, popular topics, and session growth.",
        ),
        baseTask(
          "task-6",
          "Set up deployment pipeline",
          "charlie",
          "Prepare a deploy flow for Astro and Deno KV hosting.",
          "Verify build settings and environment variables for production.",
        ),
        baseTask(
          "task-7",
          "Add note-taking helpers",
          "alice",
          "Implement quick notes and session summaries for students.",
          "Provide a simple write area and export/restore support.",
        ),
        baseTask(
          "task-8",
          "Write onboarding content",
          "bob",
          "Create welcome copy and steps for new learners to get started.",
          "Explain how the study matching works and how to join sessions.",
        ),
      ];
    default:
      return initialTasks;
  }
}

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

export function getTasksForStack(stackName: string): Task[] {
  return tasksForStack(stackName);
}
