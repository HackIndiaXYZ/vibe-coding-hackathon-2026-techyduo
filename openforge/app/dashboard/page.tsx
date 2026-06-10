"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { IdeaInput } from "@/components/hackathon/idea-input";
import { MvpPoll } from "@/components/hackathon/mvp-poll";
import { RepoResults } from "@/components/hackathon/repo-results";
import { TechStack } from "@/components/hackathon/tech-stack";
import { TaskBoard } from "@/components/hackathon/task-board";
import { DeployToolkit } from "@/components/hackathon/deploy-toolkit";
import { HackathonReview } from "@/components/hackathon/hackathon-review";
import { TeamPanel } from "@/components/team/team-panel";
import { ChatPanel } from "@/components/team/chat-panel";
import { FossGuide } from "@/components/foss/foss-guide";
import { FossScannerV2 } from "@/components/foss/foss-scanner-v2";
import { FirstPRGuide } from "@/components/foss/first-pr-guide";
import { NextSteps } from "@/components/foss/next-steps";
import { useProjectStore } from "@/stores/project-store";
import { useUiStore } from "@/stores/ui-store";

function HackathonContent() {
  const repos = useProjectStore((state) => state.repos);
  const gapAnalysis = useProjectStore((state) => state.gapAnalysis);
  const selectedFeatures = useProjectStore((state) => state.selectedFeatures);
  const selectedStack = useProjectStore((state) => state.selectedStack);
  const hackathonCompleted = useUiStore((state) => state.hackathonCompleted);

  const hasAnalysis = repos.length > 0 && gapAnalysis !== null;
  const hasFinalizedMvp = selectedFeatures.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <IdeaInput />
      <div className="w-full max-w-md">
        <TeamPanel />
      </div>
      {hasAnalysis ? <RepoResults /> : null}
      {hasAnalysis ? <MvpPoll /> : null}
      {hasFinalizedMvp ? <TechStack /> : null}
      {selectedStack !== null ? <TaskBoard /> : null}
      {selectedStack !== null ? <DeployToolkit /> : null}
      {hackathonCompleted ? <HackathonReview /> : null}
      <ChatPanel />
    </div>
  );
}

function FossContent() {
  return (
    <div className="flex flex-col gap-6">
      <FossGuide />
      <FossScannerV2 />
      <FirstPRGuide />
      <NextSteps />
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
