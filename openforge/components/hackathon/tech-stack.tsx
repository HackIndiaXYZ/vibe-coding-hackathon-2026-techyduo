"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useTaskStore } from "@/stores/task-store";
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

function generateArchitectureDoc(stackName: string) {
  switch (stackName) {
    case "Speed-Optimal":
      return `# Speed-Optimal Architecture\n\n## Overview\n\nBuild a fast, responsive Next.js frontend with Tailwind styling and a Supabase backend for auth, database, and realtime features. This stack is ideal for launching quickly with managed infrastructure.\n\n## Folder Structure\n\n- app/\n  - page.tsx\n  - dashboard/\n  - api/\n- components/\n- lib/\n- public/\n- styles/\n\n## Key Libraries\n\n- Next.js: frontend framework\n- Tailwind CSS: styling system\n- Supabase: auth, Postgres, realtime, file storage\n- React: UI state and interactions\n\n## Getting Started\n\n1. Install dependencies\n2. Configure .env with Supabase keys\n3. Run npm run dev\n4. Deploy to Vercel for production\n\n## Docs\n\n- https://nextjs.org/docs\n- https://tailwindcss.com/docs\n- https://supabase.com/docs\n`;
    case "Learning-Focused":
      return `# Learning-Focused Architecture\n\n## Overview\n\nUse Astro for fast content rendering and Deno KV for edge-backed data storage. This build is lightweight and geared toward learner-focused content experiences.\n\n## Folder Structure\n\n- src/\n  - pages/\n  - components/\n  - content/\n- public/\n- deno/\n\n## Key Libraries\n\n- Astro: content-first framework\n- Deno KV: simple key-value store\n- TypeScript: type safety\n\n## Getting Started\n\n1. Install dependencies\n2. Configure Deno KV and local env\n3. Run the dev server\n4. Publish to a Deno-compatible host\n\n## Docs\n\n- https://astro.build/docs\n- https://deno.com/manual/runtime/kv\n`;
    case "FOSS-Friendly":
      return `# FOSS-Friendly Architecture\n\n## Overview\n\nCreate a community-friendly T3 stack application using Next.js, TypeScript, Prisma, and tRPC. This architecture supports contributor workflows and scalable open-source development.\n\n## Folder Structure\n\n- app/\n- prisma/\n- src/\n  - server/\n  - components/\n  - styles/\n\n## Key Libraries\n\n- Next.js: frontend and server rendering\n- Prisma: database modeling\n- tRPC: type-safe APIs\n- Tailwind CSS: UI styling\n\n## Getting Started\n\n1. Install dependencies\n2. Run Prisma migrate\n3. Configure env for Postgres\n4. Start the dev server\n\n## Docs\n\n- https://create.t3.gg/docs\n- https://www.prisma.io/docs\n- https://trpc.io/docs\n`;
    default:
      return `# Architecture Document\n\n## Overview\n\nChoose a stack and an architecture document will appear here.\n`;
  }
}

export function TechStack() {
  const selectedStack = useProjectStore((state) => state.selectedStack);
  const setSelectedStack = useProjectStore((state) => state.setSelectedStack);
  const setArchitectureDoc = useProjectStore((state) => state.setArchitectureDoc);
  const setTaskDescriptions = useTaskStore((state) => state.setTaskDescriptions);
  const pushNotification = useUiStore((state) => state.pushNotification);
  const [docOpen, setDocOpen] = useState(false);

  function handleSelectStack(stackName: string) {
    setSelectedStack(stackName);
    setArchitectureDoc(generateArchitectureDoc(stackName));
    setTaskDescriptions(stackName);
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
        <div className="grid gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            Tasks generated for {selectedStack}.
          </p>
          <Dialog open={docOpen} onOpenChange={setDocOpen}>
            <DialogTrigger>
              <Button variant="outline">View Architecture Document</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Architecture Document</DialogTitle>
                <DialogDescription>
                  A detailed guide for the stack you selected.
                </DialogDescription>
              </DialogHeader>
              <pre className="rounded-md bg-slate-950 p-4 text-sm text-slate-100 whitespace-pre-wrap">
                {selectedStack ? generateArchitectureDoc(selectedStack) : "No architecture document available."}
              </pre>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}
    </div>
  );
}
