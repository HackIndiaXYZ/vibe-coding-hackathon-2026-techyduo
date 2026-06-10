import { NextResponse } from "next/server";
import type { Repo } from "@/types";

interface GitHubRepositoryItem {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  license: {
    name: string;
  } | null;
  html_url: string;
}

interface GitHubSearchResponse {
  items: GitHubRepositoryItem[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Missing required query parameter." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        query,
      )}&sort=stars&per_page=5`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "OpenForge",
        },
        next: {
          revalidate: 300,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "GitHub repository search failed." },
        { status: response.status },
      );
    }

    const data = (await response.json()) as GitHubSearchResponse;
    const repos: Repo[] = data.items.map((item) => ({
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      description: item.description,
      stars: item.stargazers_count,
      language: item.language,
      license: item.license?.name ?? null,
      url: item.html_url,
    }));

    return NextResponse.json(repos);
  } catch (error) {
    console.error("GitHub search error:", error);

    return NextResponse.json(
      { error: "Unable to search repositories." },
      { status: 500 },
    );
  }
}
