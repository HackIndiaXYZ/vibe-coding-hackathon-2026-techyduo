"use client";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { FossFlow } from "@/components/dashboard/foss-flow";
import { IdeaInput } from "@/components/hackathon/idea-input";
import { RepoResults } from "@/components/hackathon/repo-results";
import { TechStack } from "@/components/hackathon/tech-stack";
import { TeamPanel } from "@/components/team/team-panel";
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
      {selectedStack !== null ? <TechStack /> : null}
    </div>
  );
}

export default function DashboardPage() {
  const activeTab = useUiStore((state) => state.activeTab);

  return (
    <DashboardShell>
      {activeTab === "hackathon" ? <HackathonContent /> : <FossFlow />}
    </DashboardShell>
  );
}
