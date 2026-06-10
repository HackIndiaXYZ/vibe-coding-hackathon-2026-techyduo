"use client";

import { create } from "zustand";
import type { GapAnalysis, Repo, Review, ReviewReply } from "@/types";
import { initialReviews } from "@/lib/mock-data";

interface ProjectState {
  ideaText: string;
  repos: Repo[];
  gapAnalysis: GapAnalysis | null;
  selectedFeatures: string[];
  selectedStack: string | null;
  ideationDoc: string | null;
  architectureDoc: string | null;
  reviews: Review[];
  setIdea: (ideaText: string) => void;
  setRepos: (repos: Repo[]) => void;
  setGapAnalysis: (gapAnalysis: GapAnalysis | null) => void;
  setSelectedFeatures: (selectedFeatures: string[]) => void;
  setSelectedStack: (selectedStack: string | null) => void;
  setIdeationDoc: (ideationDoc: string | null) => void;
  setArchitectureDoc: (architectureDoc: string | null) => void;
  addReview: (review: Review) => void;
  addReviewReply: (reviewId: string, reply: ReviewReply) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  ideaText: "",
  repos: [],
  gapAnalysis: null,
  selectedFeatures: [],
  selectedStack: null,
  ideationDoc: null,
  architectureDoc: null,
  reviews: initialReviews,
  setIdea: (ideaText) => set({ ideaText }),
  setRepos: (repos) => set({ repos }),
  setGapAnalysis: (gapAnalysis) => set({ gapAnalysis }),
  setSelectedFeatures: (selectedFeatures) => set({ selectedFeatures }),
  setSelectedStack: (selectedStack) => set({ selectedStack }),
  setIdeationDoc: (ideationDoc) => set({ ideationDoc }),
  setArchitectureDoc: (architectureDoc) => set({ architectureDoc }),
  addReview: (review) =>
    set((state) => ({ reviews: [...state.reviews, review] })),
  addReviewReply: (reviewId, reply) =>
    set((state) => ({
      reviews: state.reviews.map((review) =>
        review.id === reviewId
          ? { ...review, replies: [...review.replies, reply] }
          : review,
      ),
    })),
}));
