"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useUiStore } from "@/stores/ui-store";
import { CodeMap } from "@/components/foss/code-map-wrapper";

interface ChecklistItem {
  id: string;
  label: string;
  points: number;
}

interface ScanMetrics {
  hasLicense: boolean;
  readmeExists: boolean;
  contributingExists: boolean;
  issueTemplates: boolean;
  codeOfConduct: boolean;
  recentCommits: number;
  openIssues: number;
}

export function FossScannerV2() {
  const pushNotification = useUiStore((state) => state.pushNotification);
  const [repoUrl, setRepoUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<ScanMetrics | null>(null);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [openSourceStarted, setOpenSourceStarted] = useState(false);

  const computedScore = useMemo(() => {
    if (score === null) return null;
    const bonus = checklistItems.reduce(
      (sum, item) => (checkedItems[item.id] ? sum + item.points : sum),
      0,
    );
    return Math.min(100, score + bonus);
  }, [score, checklistItems, checkedItems]);

  const allItemsCompleted = useMemo(() => {
    if (!scanComplete) return false;
    return checklistItems.length === 0 || checklistItems.every((item) => checkedItems[item.id]);
  }, [checklistItems, checkedItems, scanComplete]);

  const handleScan = () => {
    if (!repoUrl.trim()) {
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScanComplete(false);
    setOpenSourceStarted(false);

    const targetScore = 70 + (repoUrl.trim().length % 20);
    const newMetrics = {
      hasLicense: targetScore > 75,
      readmeExists: targetScore > 70,
      contributingExists: targetScore > 72,
      issueTemplates: targetScore > 76,
      codeOfConduct: targetScore > 74,
      recentCommits: 4 + (targetScore % 6),
      openIssues: 1 + ((100 - targetScore) % 8),
    };

    const interval = window.setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          window.clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          setScore(targetScore);
          setMetrics(newMetrics);
          setChecklistItems([
            ...(!newMetrics.hasLicense
              ? [{ id: "license", label: "Choose an open-source license", points: 5 }]
              : []),
            ...(!newMetrics.readmeExists
              ? [{ id: "readme", label: "Add README.md with setup instructions", points: 5 }]
              : []),
            ...(!newMetrics.contributingExists
              ? [{ id: "contributing", label: "Add CONTRIBUTING.md", points: 4 }]
              : []),
            ...(!newMetrics.codeOfConduct
              ? [{ id: "code-of-conduct", label: "Add CODE_OF_CONDUCT.md", points: 4 }]
              : []),
            ...(!newMetrics.issueTemplates
              ? [{ id: "issue-templates", label: "Set up issue templates", points: 4 }]
              : []),
            { id: "remove-secrets", label: "Remove hardcoded secrets", points: 6 },
            { id: "release", label: "Create a GitHub release", points: 4 },
          ]);
          setCheckedItems({});
          pushNotification("FOSS readiness scan complete.");
          return 100;
        }
        return next;
      });
    }, 200);
  };

  const handleToggleItem = (itemId: string) => {
    setCheckedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleOpenSourceProject = () => {
    setOpenSourceStarted(true);
    pushNotification("Open source journey started! Explore the code map next.");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>FOSS Repository Scanner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-[1fr,220px]">
            <Input
              value={repoUrl}
              onChange={(event) => setRepoUrl(event.target.value)}
              placeholder="https://github.com/your-org/your-repo"
              className="min-w-0"
            />
            <Button onClick={handleScan} disabled={isScanning}>
              {isScanning ? "Scanning..." : "Scan Repository"}
            </Button>
          </div>

          {isScanning && (
            <div className="space-y-2">
              <Progress value={scanProgress} />
              <p className="text-sm text-muted-foreground">Scanning repository for FOSS readiness...</p>
            </div>
          )}

          {scanComplete && metrics && (
            <div className="grid gap-4">
              <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold">FOSS Readiness Score</span>
                  <Badge variant="secondary">{computedScore}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={metrics.hasLicense ? "default" : "secondary"}>
                    License {metrics.hasLicense ? "present" : "missing"}
                  </Badge>
                  <Badge variant={metrics.readmeExists ? "default" : "secondary"}>
                    README {metrics.readmeExists ? "present" : "missing"}
                  </Badge>
                  <Badge variant={metrics.contributingExists ? "default" : "secondary"}>
                    CONTRIBUTING {metrics.contributingExists ? "present" : "missing"}
                  </Badge>
                  <Badge variant={metrics.issueTemplates ? "default" : "secondary"}>
                    Issue templates {metrics.issueTemplates ? "ready" : "missing"}
                  </Badge>
                  <Badge variant={metrics.codeOfConduct ? "default" : "secondary"}>
                    Code of conduct {metrics.codeOfConduct ? "present" : "missing"}
                  </Badge>
                  <Badge variant="outline">Commits: {metrics.recentCommits}</Badge>
                  <Badge variant="outline">Open issues: {metrics.openIssues}</Badge>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="mb-3 font-semibold">Checklist</p>
                <div className="space-y-3">
                  {checklistItems.map((item) => (
                    <label key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                      <input
                        type="checkbox"
                        checked={Boolean(checkedItems[item.id])}
                        onChange={() => handleToggleItem(item.id)}
                        className="h-4 w-4 rounded border-slate-300 text-primary"
                      />
                      <div className="flex-1 text-sm">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">+{item.points} points</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {allItemsCompleted && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                  <div className="mb-3 font-semibold">Congratulations!</div>
                  <p className="mb-3">Your repository is ready to shine as an open-source project.</p>
                  <Button onClick={handleOpenSourceProject}>Open Source This Project</Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {scanComplete && (
        <Card>
          <CardHeader>
            <CardTitle>Interactive Code Map</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Explore the project's architecture and prepare your repo for open contribution.
            </p>
            {openSourceStarted && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                Open Source mode activated. Use the code map to identify areas for documentation and contributor orientation.
              </div>
            )}
            <CodeMap />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
