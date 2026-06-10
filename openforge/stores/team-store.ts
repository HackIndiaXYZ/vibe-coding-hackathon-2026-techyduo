"use client";

import { create } from "zustand";
import { initialChat, initialTeam } from "@/lib/mock-data";
import type { ChatMessage, TeamMember } from "@/types";

interface TeamState {
  members: TeamMember[];
  chatMessages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  addMember: (member: TeamMember) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  members: initialTeam,
  chatMessages: initialChat,
  addMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  addMember: (member) =>
    set((state) => ({ members: [...state.members, member] })),
}));
