"use client";

import { useState, type DragEvent } from "react";
import { useTaskStore } from "@/stores/task-store";
import { useTeamStore } from "@/stores/team-store";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function TaskBoard() {
  const tasks = useTaskStore((state) => state.tasks);
  const moveTask = useTaskStore((state) => state.moveTask);
  const assignTask = useTaskStore((state) => state.assignTask);
  const members = useTeamStore((state) => state.members);

  const [helpTaskId, setHelpTaskId] = useState<string | null>(null);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inprogress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (doneTasks.length / totalTasks) * 100 : 0;

  const handleDragStart = (e: DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    newStatus: "todo" | "inprogress" | "done",
  ) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      moveTask(taskId, newStatus);
    }
  };

  const getAssigneeName = (assigneeId: string) => {
    const member = members.find((m) => m.id === assigneeId);
    return member?.name || "Unknown";
  };

  const TaskCard = ({ task }: { task: typeof tasks[number] }) => {
    const isAlice = task.assigneeId === "alice";

    return (
      <Card
        draggable
        onDragStart={(e) => handleDragStart(e, task.id)}
        className={`border cursor-move transition-shadow ${
          isAlice
            ? "border-blue-400 bg-blue-50 hover:bg-blue-100"
            : "border-slate-200 bg-white hover:shadow-md"
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-sm">{task.title}</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {task.description}
              </p>
            </div>
            <Dialog open={helpTaskId === task.id} onOpenChange={(open) => setHelpTaskId(open ? task.id : null)}>
              <DialogTrigger>
                <Button variant="outline" size="sm">
                  Need help?
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>AI Help</DialogTitle>
                  <DialogDescription>
                    Suggestions for {task.title}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 text-sm text-muted-foreground">
                  {task.aiHelp}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex flex-col gap-2">
            <div className="text-xs text-muted-foreground">Assignee</div>
            <select
              value={task.assigneeId}
              onChange={(e) => assignTask(task.id, e.target.value)}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm outline-none focus:border-blue-500"
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <div className="text-xs text-muted-foreground">
              Currently assigned to {getAssigneeName(task.assigneeId)}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="bg-gray-100 rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "todo")}
        >
          <h3 className="font-semibold mb-3">To Do</h3>
          <div className="flex flex-col gap-2">
            {todoTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div
          className="bg-gray-100 rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "inprogress")}
        >
          <h3 className="font-semibold mb-3">In Progress</h3>
          <div className="flex flex-col gap-2">
            {inProgressTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div
          className="bg-gray-100 rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "done")}
        >
          <h3 className="font-semibold mb-3">Done</h3>
          <div className="flex flex-col gap-2">
            {doneTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Progress</span>
        <Progress value={progress} className="flex-1" />
        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
