"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { communityMembers } from "@/lib/mock-data";
import { useTeamStore } from "@/stores/team-store";
import { useUiStore } from "@/stores/ui-store";
import type { TeamMember } from "@/types";

const AVATAR_PLACEHOLDER = "https://i.pravatar.cc/40";

function avatarUrl(member: TeamMember) {
  return `${AVATAR_PLACEHOLDER}?u=${member.id}`;
}

export function TeamPanel() {
  const members = useTeamStore((state) => state.members);
  const addMember = useTeamStore((state) => state.addMember);
  const pushNotification = useUiStore((state) => state.pushNotification);
  const [open, setOpen] = useState(false);

  function handleInvite(member: TeamMember) {
    addMember(member);
    pushNotification(`${member.name} has joined the team!`);
    setOpen(false);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
          <CardAction>
            <Button onClick={() => setOpen(true)}>
              <UserPlus />
              Find Teammates
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-start gap-3">
              <Avatar>
                <AvatarImage
                  src={avatarUrl(member)}
                  alt={member.name}
                />
                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{member.name}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Find Teammates</DialogTitle>
            <DialogDescription>
              Invite builders from the community to join your sprint.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            {communityMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between gap-3 rounded-lg border p-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{member.name}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleInvite(member)}
                >
                  Invite
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
