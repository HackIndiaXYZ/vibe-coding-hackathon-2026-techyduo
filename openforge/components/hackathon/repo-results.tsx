"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProjectStore } from "@/stores/project-store";

export function RepoResults() {
  const repos = useProjectStore((state) => state.repos);
  const gapAnalysis = useProjectStore((state) => state.gapAnalysis);
  const ideaText = useProjectStore((state) => state.ideaText);
  const ideationDoc = useProjectStore((state) => state.ideationDoc);
  const setIdeationDoc = useProjectStore((state) => state.setIdeationDoc);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (repos.length === 0 || gapAnalysis === null) {
    return null;
  }

  const analysis = gapAnalysis;

  function buildIdeationDocument() {
    const repoLines = repos
      .map(
        (repo) =>
          `- [${repo.name}](${repo.url}) (${repo.stars} stars)${
            repo.description ? `: ${repo.description}` : ""
          }`,
      )
      .join("\n");

    return `# Ideation Document\n\n## Idea\n\n${ideaText || "No idea provided."}\n\n## Gap Analysis\n\n${analysis.uniqueAngle}\n\n### Improvements\n\n${analysis.improvements
      .map((improvement) => `- ${improvement}`)
      .join("\n")}\n\n## Selected Repositories\n\n${repoLines}\n`;
  }

  function handleGenerateIdeationDocument() {
    const document = buildIdeationDocument();
    setIdeationDoc(document);
    setDialogOpen(true);
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <p className="text-sm">{gapAnalysis.uniqueAngle}</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {gapAnalysis.improvements.map((improvement) => (
              <li key={improvement}>{improvement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {repos.map((repo) => (
          <Card key={repo.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  {repo.name}
                  <ExternalLink className="size-3.5" />
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <p className="text-sm text-muted-foreground">
                {repo.description ?? "No description provided."}
              </p>
              <p className="text-sm font-medium">{repo.stars} stars</p>
              <div className="flex flex-wrap gap-2">
                {repo.language ? (
                  <Badge variant="secondary">{repo.language}</Badge>
                ) : null}
                {repo.license ? (
                  <Badge variant="outline">{repo.license}</Badge>
                ) : (
                  <Badge variant="destructive">No license</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button onClick={handleGenerateIdeationDocument}>
              Generate Ideation Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Ideation Document</DialogTitle>
              <DialogDescription>
                A generated markdown brief based on your idea and repo analysis.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <pre className="rounded-md bg-slate-950 p-4 text-sm text-slate-100 whitespace-pre-wrap">
                {ideationDoc ?? "No ideation document available."}
              </pre>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
