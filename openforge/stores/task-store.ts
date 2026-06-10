"use client";

import { create } from "zustand";
import { initialTasks } from "@/lib/mock-data";
import type { Task } from "@/types";

type TaskStatus = Task["status"];

interface TaskState {
  tasks: Task[];
  moveTask: (id: string, newStatus: TaskStatus) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: initialTasks,
  moveTask: (id, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    })),
}));
