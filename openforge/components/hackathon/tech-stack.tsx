"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjectStore } from "@/stores/project-store";
import { useUiStore } from "@/stores/ui-store";

const STACKS = [
  {
    name: "Speed-Optimal",
    technologies: "Next.js + Tailwind + Supabase",
    license: "MIT",
    reason: "Ship fast with familiar full-stack tooling and hosted auth/database.",
  },
  {
    name: "Learning-Focused",
    technologies: "Astro + Deno KV",
    license: "MIT",
    reason: "Explore modern edge patterns while keeping the stack lightweight.",
  },
  {
    name: "FOSS-Friendly",
    technologies: "T3 Stack",
    license: "MIT",
    reason: "Type-safe end-to-end stack with strong open-source community defaults.",
  },
] as const;

export function TechStack() {
  const selectedStack = useProjectStore((state) => state.selectedStack);
  const setSelectedStack = useProjectStore((state) => state.setSelectedStack);
  const pushNotification = useUiStore((state) => state.pushNotification);

  function handleSelectStack(stackName: string) {
    setSelectedStack(stackName);
    pushNotification(`${stackName} stack selected — generating tasks...`);
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-3">
        {STACKS.map((stack) => (
          <Card key={stack.name}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle>{stack.name}</CardTitle>
                <Badge variant="outline">{stack.license}</Badge>
              </div>
              <CardDescription>{stack.technologies}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className="text-sm text-muted-foreground">{stack.reason}</p>
              <Button
                variant={selectedStack === stack.name ? "default" : "outline"}
                onClick={() => handleSelectStack(stack.name)}
              >
                Select Stack
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedStack ? (
        <p className="text-sm font-medium text-muted-foreground">
          Tasks generated!
        </p>
      ) : null}
    </div>
  );
}
