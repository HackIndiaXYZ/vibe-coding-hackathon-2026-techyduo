"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTaskStore } from "@/stores/task-store";
import { useTeamStore } from "@/stores/team-store";

export function HackathonFlow() {
  const members = useTeamStore((state) => state.members);
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader>
          <CardTitle>AI Study Group Finder Sprint</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <span className="text-sm font-medium">{task.title}</span>
              <Badge variant={task.status === "done" ? "default" : "secondary"}>
                {task.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {members.map((member) => (
            <div key={member.id}>
              <div className="font-medium">{member.name}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
