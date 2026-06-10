"use client";

import { create } from "zustand";

export type ActiveTab = "hackathon" | "foss";

interface UiState {
  activeTab: ActiveTab;
  notifications: string[];
  setTab: (activeTab: ActiveTab) => void;
  pushNotification: (notification: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeTab: "hackathon",
  notifications: ["Sprint workspace ready"],
  setTab: (activeTab) => set({ activeTab }),
  pushNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
}));
