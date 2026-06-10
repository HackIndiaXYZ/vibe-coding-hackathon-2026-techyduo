"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const prSteps = [
  {
    id: "setup",
    title: "Set up the project locally",
    details: (
      <div className="space-y-3 text-sm">
        <p>Clone the repository and install dependencies:</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`git clone https://github.com/your-org/your-repo.git
cd your-repo
npm install`}
        </pre>
        <p>Copy and configure environment variables:</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`cp .env.example .env.local
# Edit .env.local and fill in your API keys and credentials`}
        </pre>
        <p>Start the development server:</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`npm run dev
# Open http://localhost:3000 in your browser`}
        </pre>
      </div>
    ),
  },
  {
    id: "issue",
    title: "Pick a Good First Issue",
    details: (
      <div className="space-y-3 text-sm">
        <p>Look for issues labeled "good first issue" or "beginner-friendly" on GitHub:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Filter by label in the Issues tab</li>
          <li>Read the issue description carefully</li>
          <li>Check if someone is already working on it</li>
          <li>Comment: "Can I work on this?" to claim it</li>
        </ul>
        <p>Read the CONTRIBUTING.md guide for community standards:</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`https://github.com/your-org/your-repo/blob/main/CONTRIBUTING.md`}
        </pre>
      </div>
    ),
  },
  {
    id: "branch",
    title: "Create a branch",
    details: (
      <div className="space-y-3 text-sm">
        <p>Create a feature branch with a descriptive name:</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`git checkout -b feat/add-dark-mode
# or
git checkout -b fix/header-alignment-issue`}
        </pre>
        <p>Branch naming conventions:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><code className="bg-slate-100 px-1 py-0.5 rounded">feat/</code> for new features</li>
          <li><code className="bg-slate-100 px-1 py-0.5 rounded">fix/</code> for bug fixes</li>
          <li><code className="bg-slate-100 px-1 py-0.5 rounded">docs/</code> for documentation</li>
          <li>Use hyphens to separate words, not underscores</li>
        </ul>
      </div>
    ),
  },
  {
    id: "change",
    title: "Make the change",
    details: (
      <div className="space-y-3 text-sm">
        <p>Use the code map to find the right file. Refer to the file purposes and edit tips.</p>
        <p>For a UI fix, you might edit a component like <code className="bg-slate-100 px-1 py-0.5 rounded">components/Header.tsx</code>.</p>
        <p>For a backend change, update <code className="bg-slate-100 px-1 py-0.5 rounded">lib/supabaseClient.ts</code>.</p>
        <p>Keep changes focused on the issue—avoid scope creep.</p>
      </div>
    ),
  },
  {
    id: "test",
    title: "Test your changes",
    details: (
      <div className="space-y-3 text-sm">
        <p>Run the linter and formatter:</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`npm run lint
npm run format`}
        </pre>
        <p>Run tests (if available):</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`npm run test`}
        </pre>
        <p>Manually test your feature in the browser:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Check the fix works as expected</li>
          <li>Test edge cases (empty states, errors, etc.)</li>
          <li>Verify no regressions in other features</li>
        </ul>
      </div>
    ),
  },
  {
    id: "commit",
    title: "Commit & Push",
    details: (
      <div className="space-y-3 text-sm">
        <p>Use conventional commits for clear history:</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`git add .
git commit -m "feat: add dark mode toggle button"
# or
git commit -m "fix: align header items to the right"`}
        </pre>
        <p>Conventional commit format: <code className="bg-slate-100 px-1 py-0.5 rounded">&lt;type&gt;: &lt;description&gt;</code></p>
        <p>Push your branch:</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`git push origin feat/add-dark-mode`}
        </pre>
      </div>
    ),
  },
  {
    id: "pr",
    title: "Open a Pull Request",
    details: (
      <div className="space-y-3 text-sm">
        <p>Navigate to the GitHub repo and click "Create Pull Request".</p>
        <p>Fill in the PR description:</p>
        <pre className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 overflow-auto">
{`## What does this do?
Adds a dark mode toggle button to the header.

## Closes
Closes #123

## Screenshots
[Add before/after screenshots if applicable]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated`}
        </pre>
        <p>Tips:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Reference the issue number with "Closes #123"</li>
          <li>Add screenshots for UI changes</li>
          <li>Keep the description clear and concise</li>
        </ul>
      </div>
    ),
  },
  {
    id: "celebrate",
    title: "Celebrate & Next Steps",
    details: (
      <div className="space-y-3 text-sm">
        <p>🎉 You've opened your first pull request!</p>
        <p>What happens next:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Maintainers will review your code</li>
          <li>They might request changes</li>
          <li>Once approved, your code gets merged</li>
          <li>You'll be added to the contributor list</li>
        </ul>
        <p>After merge, you're officially a contributor! Consider:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Picking another issue to work on</li>
          <li>Helping review other PRs</li>
          <li>Mentoring new contributors</li>
        </ul>
      </div>
    ),
  },
];

export function FirstPRGuide() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const handleToggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const completionCount = Object.values(completedSteps).filter(Boolean).length;
  const isComplete = completionCount === prSteps.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Raise Your First PR</CardTitle>
          {isComplete && (
            <Badge className="w-fit bg-emerald-600">🎉 Ready to contribute!</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Step-by-step walkthrough: {completionCount}/{prSteps.length} steps completed
        </p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {prSteps.map((step) => (
            <AccordionItem key={step.id} value={step.id}>
              <div className="flex items-center gap-3 w-full">
                <input
                  type="checkbox"
                  checked={Boolean(completedSteps[step.id])}
                  onChange={() => handleToggleStep(step.id)}
                  className="h-4 w-4 rounded border-slate-300 text-primary"
                />
                <AccordionTrigger className="flex-1 text-left hover:no-underline">
                  <span className={completedSteps[step.id] ? "line-through text-muted-foreground" : ""}>
                    {step.title}
                  </span>
                </AccordionTrigger>
              </div>
              <AccordionContent value={step.id} className="pl-7">
                {step.details}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
