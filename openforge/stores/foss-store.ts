"use client";

import { create } from "zustand";
import type { CleanCodeDiff, FossScanResult } from "@/types";

interface FossState {
  scanResult: FossScanResult | null;
  cleanDiff: CleanCodeDiff | null;
  generatedReadme: string | null;
  setScanResult: (scanResult: FossScanResult | null) => void;
  setCleanDiff: (cleanDiff: CleanCodeDiff | null) => void;
  setReadme: (generatedReadme: string | null) => void;
}

export const useFossStore = create<FossState>((set) => ({
  scanResult: null,
  cleanDiff: null,
  generatedReadme: null,
  setScanResult: (scanResult) => set({ scanResult }),
  setCleanDiff: (cleanDiff) => set({ cleanDiff }),
  setReadme: (generatedReadme) => set({ generatedReadme }),
}));
