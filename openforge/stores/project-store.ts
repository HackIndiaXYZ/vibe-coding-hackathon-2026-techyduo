"use client";

import { create } from "zustand";
import type { GapAnalysis, Repo } from "@/types";

interface ProjectState {
  ideaText: string;
  repos: Repo[];
  gapAnalysis: GapAnalysis | null;
  selectedFeatures: string[];
  selectedStack: string | null;
  setIdea: (ideaText: string) => void;
  setRepos: (repos: Repo[]) => void;
  setGapAnalysis: (gapAnalysis: GapAnalysis | null) => void;
  setSelectedFeatures: (selectedFeatures: string[]) => void;
  setSelectedStack: (selectedStack: string | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  ideaText: "",
  repos: [],
  gapAnalysis: null,
  selectedFeatures: [],
  selectedStack: null,
  setIdea: (ideaText) => set({ ideaText }),
  setRepos: (repos) => set({ repos }),
  setGapAnalysis: (gapAnalysis) => set({ gapAnalysis }),
  setSelectedFeatures: (selectedFeatures) => set({ selectedFeatures }),
  setSelectedStack: (selectedStack) => set({ selectedStack }),
}));
