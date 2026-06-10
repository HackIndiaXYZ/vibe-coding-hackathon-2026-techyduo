"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTaskStore } from "@/stores/task-store";
import { useUiStore } from "@/stores/ui-store";

const COMMANDS = [
  "git push origin main",
  "npx vercel --prod",
  "netlify deploy --prod",
  "railway up",
  "render deploy",
  "Set up GitHub Actions for CI/CD",
  "git tag v1.0.0 && git push --tags",
];

const DOCKERFILE = `# Dockerfile for Next.js\nFROM node:20-alpine AS deps\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci\n\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY . ./\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/public ./public\nCOPY --from=builder /app/.next ./.next\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY --from=builder /app/package.json ./package.json\nEXPOSE 3000\nCMD ["npm", "run", "start"]\n`;

export function DeployToolkit() {
  const tasks = useTaskStore((state) => state.tasks);
  const pushNotification = useUiStore((state) => state.pushNotification);
  const setHackathonCompleted = useUiStore((state) => state.setHackathonCompleted);
  const [dockerOpen, setDockerOpen] = useState(false);

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const readyToLaunch = totalTasks > 0 && doneTasks === totalTasks;

  const commandText = useMemo(() => COMMANDS.join("\n"), []);

  const handleOpenLink = (url: string, message: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    pushNotification(message);
  };

  const handleCopyCommands = async () => {
    try {
      await navigator.clipboard.writeText(commandText);
      pushNotification("Commands copied to clipboard!");
    } catch {
      pushNotification("Unable to copy commands. Please copy them manually.");
    }
  };

  if (!readyToLaunch) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🚀 GitHub & Deployment Help</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ul className="space-y-3 text-sm">
          <li>
            <strong>Push your code:</strong>{" "}
            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-900">
              git push origin main
            </code>
          </li>
          <li>
            <strong>Deploy to Vercel:</strong>{" "}
            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-900">
              npx vercel --prod
            </code>
          </li>
          <li>
            <strong>Deploy to Netlify:</strong>{" "}
            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-900">
              netlify deploy --prod
            </code>
          </li>
          <li>
            <strong>Deploy to Railway:</strong>{" "}
            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-900">
              railway up
            </code>
          </li>
          <li>
            <strong>Deploy to Render:</strong>{" "}
            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-900">
              render deploy
            </code>
          </li>
          <li>Set up GitHub Actions for CI/CD</li>
          <li>
            Tag your first release:{" "}
            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-900">
              git tag v1.0.0 && git push --tags
            </code>
          </li>
        </ul>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            onClick={() => handleOpenLink("https://vercel.com/new", "Ready to deploy! Opening Vercel in a new tab...")}
          >
            Deploy to Vercel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOpenLink("https://www.netlify.com/", "Opening Netlify for deployment...")}
          >
            Deploy to Netlify
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOpenLink("https://railway.app/", "Opening Railway for deployment...")}
          >
            Deploy to Railway
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOpenLink("https://render.com/", "Opening Render for deployment...")}
          >
            Deploy to Render
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOpenLink("https://www.freenom.com/", "Opening domain options in a new tab...")}
          >
            Get Free Domain
          </Button>
          <Dialog open={dockerOpen} onOpenChange={setDockerOpen}>
            <DialogTrigger>
              <Button variant="outline">Dockerize</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dockerfile Snippet</DialogTitle>
              </DialogHeader>
              <pre className="rounded-md bg-slate-950 p-4 text-sm text-slate-100 whitespace-pre-wrap">
                {DOCKERFILE}
              </pre>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleCopyCommands}>
            Copy All Commands
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setHackathonCompleted(true);
              pushNotification("Hackathon wrapped up! Reflection section is ready.");
            }}
          >
            Wrap Up Hackathon
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
