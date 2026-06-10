"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { MessageSquare, Phone, X } from "lucide-react";
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

const CURRENT_USER_ID = "alice";

export function ChatPanel() {
  const chatMessages = useTeamStore((state) => state.chatMessages);
  const addMessage = useTeamStore((state) => state.addMessage);
  const members = useTeamStore((state) => state.members);

  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [callStatus, setCallStatus] = useState<"calling" | "in-call">("calling");
  const [callDuration, setCallDuration] = useState(0);

  const callPartner =
    members.find((member) => member.id !== CURRENT_USER_ID) || members[0];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;

    if (callOpen) {
      setCallStatus("calling");
      setCallDuration(0);
      timeout = setTimeout(() => {
        setCallStatus("in-call");
        interval = setInterval(() => {
          setCallDuration((duration) => duration + 1);
        }, 1000);
      }, 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [callOpen]);

  const handleSend = () => {
    if (input.trim()) {
      addMessage({
        id: Date.now().toString(),
        senderId: CURRENT_USER_ID,
        text: input,
        timestamp: new Date().toISOString(),
      });
      setInput("");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const getMember = (senderId: string) => {
    return members.find((m) => m.id === senderId) || members[0];
  };

  const last5Messages = chatMessages.slice(-5);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setChatOpen((open) => !open)}
        className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none"
        aria-label={chatOpen ? "Hide chat" : "Open chat"}
      >
        <MessageSquare className="h-5 w-5" />
      </button>
      {chatOpen ? (
        <Card className="fixed bottom-20 right-4 z-40 w-80 h-96 flex flex-col shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-sm">Team Chat</CardTitle>
              <div className="flex items-center gap-2">
                <Dialog open={callOpen} onOpenChange={setCallOpen}>
                  <DialogTrigger>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Voice Call</DialogTitle>
                      <DialogDescription>
                        Simulated voice call with {callPartner?.name ?? "a teammate"}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      {callStatus === "calling" ? (
                        <div>
                          <p className="text-sm font-medium">Calling {callPartner?.name}...</p>
                          <p className="text-sm text-muted-foreground">Ringing...</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm font-medium">In call with {callPartner?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Duration: {formatDuration(callDuration)}
                          </p>
                          <Button onClick={() => setCallOpen(false)}>
                            Hang up
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-slate-100"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
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
      ) : null}
    </>
  );
}
