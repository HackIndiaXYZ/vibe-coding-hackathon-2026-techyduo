"use client";

import { create } from "zustand";
import { getTasksForStack, initialTasks } from "@/lib/mock-data";
import type { Task } from "@/types";

type TaskStatus = Task["status"];

interface TaskState {
  tasks: Task[];
  moveTask: (id: string, newStatus: TaskStatus) => void;
  assignTask: (id: string, memberId: string) => void;
  setTaskDescriptions: (stackName: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: initialTasks,
  moveTask: (id, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    })),
  assignTask: (id, memberId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, assigneeId: memberId } : task,
      ),
    })),
  setTaskDescriptions: (stackName) =>
    set({ tasks: getTasksForStack(stackName) }),
}));
