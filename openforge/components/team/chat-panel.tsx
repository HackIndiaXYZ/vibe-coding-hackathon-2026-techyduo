"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTeamStore } from "@/stores/team-store";

export function ChatPanel() {
  const chatMessages = useTeamStore((state) => state.chatMessages);
  const addMessage = useTeamStore((state) => state.addMessage);
  const members = useTeamStore((state) => state.members);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      addMessage({
        id: Date.now().toString(),
        senderId: "alice",
        text: input,
        timestamp: new Date().toISOString(),
      });
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const getMember = (senderId: string) => {
    return members.find((m) => m.id === senderId) || members[0];
  };

  const last5Messages = chatMessages.slice(-5);

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 flex flex-col shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Team Chat</CardTitle>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline" size="sm">
                Summarize
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Last 5 Messages</DialogTitle>
                <DialogDescription>Recent team conversation summary</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 mt-4">
                {last5Messages.map((msg) => (
                  <div key={msg.id} className="flex gap-2 text-sm">
                    <span className="font-medium">{getMember(msg.senderId).name}:</span>
                    <span className="text-muted-foreground">{msg.text}</span>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3 overflow-hidden">
        <div className="flex-1 overflow-y-auto flex flex-col gap-3">
          {chatMessages.map((msg) => {
            const member = getMember(msg.senderId);
            return (
              <div key={msg.id} className="flex gap-2 text-sm">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="sm">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
