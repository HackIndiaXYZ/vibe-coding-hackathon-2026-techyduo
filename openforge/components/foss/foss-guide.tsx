"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COMMUNITY_LINKS = [
  {
    label: "Open Source Initiative",
    url: "https://opensource.org/",
  },
  {
    label: "First Timers Only",
    url: "https://www.firsttimersonly.com/",
  },
  {
    label: "Up For Grabs",
    url: "https://up-for-grabs.net/",
  },
  {
    label: "Hacktoberfest",
    url: "https://hacktoberfest.com/",
  },
];

export function FossGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>FOSS Leap Guide</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="leading-7 text-slate-700">
          Free and open-source software (FOSS) invites contributors, improves transparency, and makes your hackathon project easier to maintain.
          Use this guide to convert your app into a community-ready repository.
        </p>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-semibold">What is FOSS and why contribute?</p>
          <p className="text-sm leading-6 text-slate-700">
            FOSS is software that anyone can use, study, modify, and share. Contributing opens the door to feedback, collaborators, and long-term adoption.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Steps to convert your hackathon project</p>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
            <li>Clean the code: remove secrets, format consistently, and add meaningful comments.</li>
            <li>Add a license: choose a license from choosealicense.com or the Open Source Initiative.</li>
            <li>Create README, CONTRIBUTING.md, and CODE_OF_CONDUCT.md with clear community guidance.</li>
            <li>Set up issue templates and a pull request template for contributors.</li>
            <li>Release under a version and tag your first stable milestone.</li>
            <li>Publicize your project and invite contributors through programs like Hacktoberfest and GSOC.</li>
          </ol>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {COMMUNITY_LINKS.map((link) => (
            <Button
              key={link.label}
              variant="outline"
              onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
