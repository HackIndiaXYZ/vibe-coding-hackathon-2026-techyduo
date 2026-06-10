"use client";

import dynamic from "next/dynamic";

const CodeMap = dynamic(() => import("./code-map").then((mod) => ({ default: mod.CodeMap })), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center text-muted-foreground">Loading code map...</div>,
});

export { CodeMap };
