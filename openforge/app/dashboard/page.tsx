"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { IdeaInput } from "@/components/hackathon/idea-input";
import { MvpPoll } from "@/components/hackathon/mvp-poll";
import { RepoResults } from "@/components/hackathon/repo-results";
import { TechStack } from "@/components/hackathon/tech-stack";
import { TaskBoard } from "@/components/hackathon/task-board";
import { TeamPanel } from "@/components/team/team-panel";
import { ChatPanel } from "@/components/team/chat-panel";
import { FossScanner } from "@/components/foss/foss-scanner";
import { CodeMap } from "@/components/foss/code-map-wrapper";
import { useProjectStore } from "@/stores/project-store";
import { useUiStore } from "@/stores/ui-store";

function HackathonContent() {
  const repos = useProjectStore((state) => state.repos);
  const gapAnalysis = useProjectStore((state) => state.gapAnalysis);
  const selectedStack = useProjectStore((state) => state.selectedStack);

  const hasAnalysis = repos.length > 0 && gapAnalysis !== null;

  return (
    <div className="flex flex-col gap-6">
      <IdeaInput />
      <div className="w-full max-w-md">
        <TeamPanel />
      </div>
      {hasAnalysis ? <RepoResults /> : null}
      {hasAnalysis ? <MvpPoll /> : null}
      {selectedStack !== null ? <TechStack /> : null}
      {selectedStack !== null ? <TaskBoard /> : null}
      <ChatPanel />
    </div>
  );
}

function FossContent() {
  return (
    <div className="flex flex-col gap-6">
      <FossScanner />
      <CodeMap />
    </div>
  );
}

export default function DashboardPage() {
  const activeTab = useUiStore((state) => state.activeTab);

  return (
    <DashboardShell>
      {activeTab === "hackathon" ? <HackathonContent /> : <FossContent />}
    </DashboardShell>
  );
}
