"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "@/stores/project-store";
import type { GapAnalysis, Repo } from "@/types";

const MOCK_IDEA = "An AI-powered study group finder for students";

function generateGapAnalysis(repos: Repo[]): GapAnalysis {
  const improvements: string[] = [];

  const lowStarRepos = repos.filter((repo) => repo.stars < 10);
  if (lowStarRepos.length > 0) {
    improvements.push(
      `Target an underserved niche — ${lowStarRepos.map((repo) => repo.name).join(", ")} ${lowStarRepos.length === 1 ? "has" : "have"} fewer than 10 stars.`,
    );
  }

  const missingTopics = repos.filter(
    (repo) => !repo.description || repo.description.trim().length === 0,
  );
  if (missingTopics.length > 0) {
    improvements.push(
      "Add GitHub topics and a focused README — several competitors lack clear topic metadata.",
    );
  }

  if (repos.every((repo) => repo.stars >= 10) && missingTopics.length === 0) {
    improvements.push(
      "Differentiate with AI-powered matching and campus-specific filters.",
      "Offer real-time availability sync instead of static group listings.",
    );
  }

  const uniqueAngle =
    lowStarRepos.length > 0
      ? "Build a student-first study matcher where incumbents are small or inactive."
      : "Win with smarter AI matching, clearer discovery, and a polished hackathon-ready MVP.";

  return { uniqueAngle, improvements };
}

export function IdeaInput() {
  const setRepos = useProjectStore((state) => state.setRepos);
  const setGapAnalysis = useProjectStore((state) => state.setGapAnalysis);

  const [idea, setIdea] = useState(MOCK_IDEA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SEARCH_KEYWORDS = [
    "study",
    "group",
    "education",
    "student",
    "match",
  ];

  async function handleSearchRepos() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/search-repos?query=AI-powered+study+group",
      );

      if (!response.ok) {
        throw new Error("Repository search failed.");
      }

      const data = (await response.json()) as Repo[];
      const filteredRepos = data.filter((repo) => {
        const text = `${repo.name} ${repo.description ?? ""}`.toLowerCase();
        return SEARCH_KEYWORDS.some((keyword) => text.includes(keyword));
      });

      const reposToUse = filteredRepos.length > 0 ? filteredRepos : data;
      setRepos(reposToUse);

      const analysis = generateGapAnalysis(reposToUse);
      setGapAnalysis(analysis);
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Unable to search repositories.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <Textarea
        value={idea}
        onChange={(event) => setIdea(event.target.value)}
        rows={4}
        placeholder="Describe your hackathon idea..."
      />
      <div className="flex items-center gap-3">
        <Button onClick={handleSearchRepos} disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Search />
          )}
          Search Repos
        </Button>
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : null}
      </div>
    </div>
  );
}
