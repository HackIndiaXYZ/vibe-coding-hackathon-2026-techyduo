"use client";

import { create } from "zustand";

export type ActiveTab = "hackathon" | "foss";

interface UiState {
  activeTab: ActiveTab;
  notifications: string[];
  hackathonCompleted: boolean;
  setTab: (activeTab: ActiveTab) => void;
  pushNotification: (notification: string) => void;
  setHackathonCompleted: (completed: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeTab: "hackathon",
  notifications: ["Sprint workspace ready"],
  hackathonCompleted: false,
  setTab: (activeTab) => set({ activeTab }),
  pushNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  setHackathonCompleted: (completed) => set({ hackathonCompleted: completed }),
}));
