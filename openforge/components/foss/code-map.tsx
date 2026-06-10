"use client";

import { useCallback, useState } from "react";
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

const initialNodes: Node[] = [
  { id: "1", type: "default", position: { x: 250, y: 0 }, data: { label: "App" } },
  { id: "2", type: "default", position: { x: 100, y: 100 }, data: { label: "Layout" } },
  { id: "3", type: "default", position: { x: 400, y: 100 }, data: { label: "AuthProvider" } },
  { id: "4", type: "default", position: { x: 100, y: 200 }, data: { label: "Dashboard" } },
  { id: "5", type: "default", position: { x: 400, y: 200 }, data: { label: "Database" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: false },
  { id: "e1-3", source: "1", target: "3", animated: false },
  { id: "e2-4", source: "2", target: "4", animated: false },
  { id: "e3-5", source: "3", target: "5", animated: false },
];

const nodeDescriptions: Record<string, string> = {
  App: "Main application entry point that wraps the entire app with providers",
  Layout: "Layout component that structures the page with header, sidebar, and content",
  AuthProvider: "Authentication context provider that manages user login state globally",
  Dashboard: "Main dashboard component displaying project overview and metrics",
  Database: "Database layer handling data persistence and queries",
};

function CustomNode({ data }: { data: { label: string } }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const description = nodeDescriptions[data.label] || "No description available";

  return (
    <div
      className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition-colors"
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <div className="font-bold">{data.label}</div>
      {showTooltip && (
        <div className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded">
          {description}
        </div>
      )}
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

function CodeMapFlow() {
  const [nodes, , onNodesChange] = useNodesState(
    initialNodes.map((node) => ({ ...node, type: "custom" }))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [tourIndex, setTourIndex] = useState<number>(-1);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleTour = () => {
    if (!reactFlowInstance) return;

    reactFlowInstance.fitView({ padding: 0.2, duration: 800 });

    let index = 0;
    const interval = setInterval(() => {
      if (index >= edges.length) {
        clearInterval(interval);
        setTourIndex(-1);
        setEdges(
          initialEdges.map((edge) => ({ ...edge, animated: false }))
        );
        return;
      }

      setEdges((eds) =>
        eds.map((edge, i) => ({
          ...edge,
          animated: i === index,
          style: i === index ? { stroke: "#3b82f6", strokeWidth: 3 } : {},
        }))
      );

      index++;
      setTourIndex(index);
    }, 2000);
  };

  return (
    <div className="w-full h-[500px] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
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
      <Button
        onClick={handleTour}
        className="absolute top-4 right-4 z-10"
        disabled={tourIndex >= 0}
      >
        Tour
      </Button>
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
