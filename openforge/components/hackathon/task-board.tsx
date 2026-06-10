"use client";

import { useTaskStore } from "@/stores/task-store";
import { useTeamStore } from "@/stores/team-store";
import { Progress } from "@/components/ui/progress";

export function TaskBoard() {
  const tasks = useTaskStore((state) => state.tasks);
  const moveTask = useTaskStore((state) => state.moveTask);
  const members = useTeamStore((state) => state.members);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inprogress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (doneTasks.length / totalTasks) * 100 : 0;

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: "todo" | "inprogress" | "done") => {
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

  const TaskCard = ({ task }: { task: typeof tasks[number] }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      className="bg-white rounded-lg p-3 shadow-sm border cursor-move hover:shadow-md transition-shadow"
    >
      <h4 className="text-sm font-medium mb-1">{task.title}</h4>
      <p className="text-xs text-muted-foreground">{getAssigneeName(task.assigneeId)}</p>
    </div>
  );

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
