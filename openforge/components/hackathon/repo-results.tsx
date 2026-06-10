"use client";

import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjectStore } from "@/stores/project-store";

export function RepoResults() {
  const repos = useProjectStore((state) => state.repos);
  const gapAnalysis = useProjectStore((state) => state.gapAnalysis);
  const setSelectedStack = useProjectStore((state) => state.setSelectedStack);

  if (repos.length === 0 || gapAnalysis === null) {
    return null;
  }

  function handleFinalizeIdea() {
    console.log("Finalize idea", { repos, gapAnalysis });
    setSelectedStack("");
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
        <Button onClick={handleFinalizeIdea}>Finalize Idea</Button>
      </div>
    </div>
  );
}
