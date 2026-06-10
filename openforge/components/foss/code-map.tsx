"use client";

import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from "reactflow";
import type { ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NodeData {
  label: string;
  purpose: string;
  tech: string;
  editTip: string;
}

const initialNodes: Node<NodeData>[] = [
  {
    id: "readme",
    type: "custom",
    position: { x: 0, y: 0 },
    data: {
      label: "README.md",
      purpose: "Project documentation, setup guide, and contribution overview",
      tech: "Markdown",
      editTip: "Update with new features and link to CONTRIBUTING.md",
    },
  },
  {
    id: "package.json",
    type: "custom",
    position: { x: 200, y: 0 },
    data: {
      label: "package.json",
      purpose: "Project metadata, dependencies, and build scripts",
      tech: "Node.js / npm",
      editTip: "Add new packages here; increment version on release",
    },
  },
  {
    id: "env",
    type: "custom",
    position: { x: 400, y: 0 },
    data: {
      label: ".env.example",
      purpose: "Template for environment variables (secrets never committed)",
      tech: "Config Management",
      editTip: "Document all required env vars for contributors",
    },
  },
  {
    id: "pages",
    type: "custom",
    position: { x: 50, y: 120 },
    data: {
      label: "pages/",
      purpose: "Next.js page routes",
      tech: "Next.js",
      editTip: "Create new pages as .tsx files here",
    },
  },
  {
    id: "pages-app",
    type: "custom",
    position: { x: 0, y: 200 },
    data: {
      label: "_app.tsx",
      purpose: "Global app wrapper, providers, and layout",
      tech: "React, Next.js",
      editTip: "Add global contexts or providers here",
    },
  },
  {
    id: "pages-index",
    type: "custom",
    position: { x: 150, y: 200 },
    data: {
      label: "index.tsx",
      purpose: "Home page / landing page",
      tech: "React, Tailwind CSS",
      editTip: "Update homepage with new features or CTAs",
    },
  },
  {
    id: "pages-api",
    type: "custom",
    position: { x: 300, y: 200 },
    data: {
      label: "api/auth/[...nextauth].ts",
      purpose: "Authentication API routes",
      tech: "Next.js API Routes, NextAuth",
      editTip: "Configure OAuth providers or session logic here",
    },
  },
  {
    id: "components",
    type: "custom",
    position: { x: 600, y: 120 },
    data: {
      label: "components/",
      purpose: "Reusable React components",
      tech: "React",
      editTip: "Create new components for UI features",
    },
  },
  {
    id: "comp-layout",
    type: "custom",
    position: { x: 500, y: 200 },
    data: {
      label: "Layout.tsx",
      purpose: "Main layout wrapper with header, sidebar, footer",
      tech: "React, Tailwind CSS",
      editTip: "Update navigation links and layout structure here",
    },
  },
  {
    id: "comp-header",
    type: "custom",
    position: { x: 650, y: 200 },
    data: {
      label: "Header.tsx",
      purpose: "Navigation header and user menu",
      tech: "React, Tailwind CSS",
      editTip: "Add new nav links or user profile features",
    },
  },
  {
    id: "comp-task",
    type: "custom",
    position: { x: 800, y: 200 },
    data: {
      label: "TaskCard.tsx",
      purpose: "Reusable task display component",
      tech: "React, Tailwind CSS",
      editTip: "Update task display or add new task properties",
    },
  },
  {
    id: "lib",
    type: "custom",
    position: { x: 300, y: 350 },
    data: {
      label: "lib/",
      purpose: "Utility functions and helpers",
      tech: "TypeScript",
      editTip: "Add new utility functions or database queries",
    },
  },
  {
    id: "lib-supabase",
    type: "custom",
    position: { x: 200, y: 430 },
    data: {
      label: "supabaseClient.ts",
      purpose: "Supabase client initialization and queries",
      tech: "Supabase, TypeScript",
      editTip: "Add new database functions or auth config",
    },
  },
  {
    id: "lib-utils",
    type: "custom",
    position: { x: 400, y: 430 },
    data: {
      label: "utils.ts",
      purpose: "Common utility functions",
      tech: "TypeScript",
      editTip: "Add helper functions used across components",
    },
  },
  {
    id: "public",
    type: "custom",
    position: { x: 600, y: 350 },
    data: {
      label: "public/",
      purpose: "Static assets (images, favicon, etc.)",
      tech: "Static Files",
      editTip: "Add images or static files here",
    },
  },
  {
    id: "styles",
    type: "custom",
    position: { x: 800, y: 350 },
    data: {
      label: "styles/",
      purpose: "Global styles and Tailwind CSS config",
      tech: "CSS, Tailwind CSS",
      editTip: "Update global CSS or theme variables",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e-readme-pages", source: "readme", target: "pages", animated: false },
  { id: "e-readme-components", source: "readme", target: "components", animated: false },
  { id: "e-package-lib", source: "package.json", target: "lib", animated: false },
  { id: "e-env-pages-api", source: "env", target: "pages-api", animated: false },
  { id: "e-pages-pages-app", source: "pages", target: "pages-app", animated: false },
  { id: "e-pages-pages-index", source: "pages", target: "pages-index", animated: false },
  { id: "e-pages-pages-api", source: "pages", target: "pages-api", animated: false },
  { id: "e-pages-app-components", source: "pages-app", target: "components", animated: false },
  { id: "e-pages-index-comp-layout", source: "pages-index", target: "comp-layout", animated: false },
  { id: "e-comp-layout-comp-header", source: "comp-layout", target: "comp-header", animated: false },
  { id: "e-comp-layout-comp-task", source: "comp-layout", target: "comp-task", animated: false },
  { id: "e-lib-supabase-comp-task", source: "lib-supabase", target: "comp-task", animated: false },
  { id: "e-lib-utils-lib-supabase", source: "lib-utils", target: "lib-supabase", animated: false },
];

const tourPath = ["readme", "pages-app", "comp-layout", "pages-index", "lib-supabase", "comp-task", "pages-api"];

function CustomNode({ data }: { data: NodeData }) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="px-3 py-2 shadow-md rounded-md bg-white border-2 border-blue-300 cursor-pointer hover:border-blue-600 hover:shadow-lg transition-all">
          <div className="font-semibold text-sm text-slate-900">{data.label}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Purpose</p>
            <p className="text-sm text-slate-900">{data.purpose}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Tech / Framework</p>
            <p className="text-sm text-slate-700">{data.tech}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">How to Edit</p>
            <p className="text-sm text-slate-700">{data.editTip}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

function CodeMapFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const highlightedNodeId = useMemo(() => tourPath[tourStep], [tourStep]);

  const handleTour = () => {
    if (!reactFlowInstance) return;

    reactFlowInstance.fitView({ padding: 0.2, duration: 800 });

    setTourActive(true);
    setTourStep(0);

    const interval = window.setInterval(() => {
      setTourStep((prev) => {
        if (prev + 1 >= tourPath.length) {
          window.clearInterval(interval);
          setTourActive(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
  };

  return (
    <div className="w-full h-[500px] relative rounded-lg overflow-hidden border border-slate-200">
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          style: {
            ...node.style,
            opacity: !tourActive || highlightedNodeId === node.id ? 1 : 0.3,
            transition: "opacity 0.3s ease",
          },
        }))}
        edges={edges.map((edge) => ({
          ...edge,
          animated: tourActive && edges.some((e) => (e.source === highlightedNodeId && e.target === edge.target) || (e.source === edge.source && e.target === highlightedNodeId)),
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        onInit={setReactFlowInstance}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button onClick={handleTour} disabled={tourActive} size="sm">
          {tourActive ? `Tour: ${tourStep + 1}/${tourPath.length}` : "Start Tour"}
        </Button>
        {tourActive && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTourActive(false);
              setTourStep(0);
            }}
          >
            Stop Tour
          </Button>
        )}
      </div>
    </div>
  );
}

export function CodeMap() {
  return (
    <div className="flex flex-col gap-4">
      <CodeMapFlow />
    </div>
  );
}
