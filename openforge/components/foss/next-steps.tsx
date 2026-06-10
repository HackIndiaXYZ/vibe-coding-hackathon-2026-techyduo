"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const opportunities = [
  {
    title: "FOSS United",
    description: "India's largest open-source community with events like IndiaFOSS, FOSS Hack, and funding opportunities.",
    links: [
      {
        label: "Website",
        url: "https://fossunited.org",
      },
      {
        label: "IndiaFOSS Conference",
        url: "https://fossunited.org/indiaFOSS",
      },
      {
        label: "FOSS Hack",
        url: "https://fossunited.org/fosshack",
      },
    ],
  },
  {
    title: "Google Summer of Code (GSoC) & LFX Mentorship",
    description: "Paid mentorship programs connecting open-source projects with developers.",
    links: [
      {
        label: "Google Summer of Code",
        url: "https://summerofcode.withgoogle.com",
      },
      {
        label: "LFX Mentorship",
        url: "https://mentorship.lfx.linuxfoundation.org",
      },
    ],
  },
  {
    title: "Hacktoberfest",
    description: "October celebration of open source. Add the 'Hacktoberfest' topic to your repo to attract contributors.",
    links: [
      {
        label: "Hacktoberfest Website",
        url: "https://hacktoberfest.com",
      },
      {
        label: "How to Participate",
        url: "https://hacktoberfest.com/participation",
      },
    ],
  },
  {
    title: "Open Collective & GitHub Sponsors",
    description: "Funding mechanisms to support your project and reward contributors.",
    links: [
      {
        label: "Open Collective",
        url: "https://opencollective.com",
      },
      {
        label: "GitHub Sponsors",
        url: "https://github.com/sponsors",
      },
    ],
  },
  {
    title: "DevPost & Product Hunt",
    description: "Platforms to showcase your project and gain visibility.",
    links: [
      {
        label: "DevPost",
        url: "https://devpost.com",
      },
      {
        label: "Product Hunt",
        url: "https://producthunt.com",
      },
    ],
  },
  {
    title: "Write a Blog Post",
    description: "Share your journey, learnings, and invite others to contribute.",
    links: [
      {
        label: "Dev.to",
        url: "https://dev.to",
      },
      {
        label: "Hashnode",
        url: "https://hashnode.com",
      },
      {
        label: "Medium",
        url: "https://medium.com",
      },
    ],
  },
];

export function NextSteps() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Take Your Project Further</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Your open-source project is now ready to grow. Explore these opportunities to find funding, contributors, and visibility.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((opp) => (
          <Card key={opp.title}>
            <CardHeader>
              <CardTitle className="text-base">{opp.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-700">{opp.description}</p>
              <div className="flex flex-wrap gap-2">
                {opp.links.map((link) => (
                  <Button
                    key={link.label}
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
