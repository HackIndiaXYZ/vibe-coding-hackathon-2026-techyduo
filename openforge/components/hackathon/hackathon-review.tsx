"use client";

import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "@/stores/project-store";
import { useTeamStore } from "@/stores/team-store";

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function HackathonReview() {
  const reviews = useProjectStore((state) => state.reviews);
  const addReview = useProjectStore((state) => state.addReview);
  const addReviewReply = useProjectStore((state) => state.addReviewReply);
  const members = useTeamStore((state) => state.members);
  const [showReflectionForm, setShowReflectionForm] = useState(false);
  const [newReflection, setNewReflection] = useState("");
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const currentUser = members.find((member) => member.id === "alice") ?? members[0];

  const handleAddReflection = () => {
    const text = newReflection.trim();
    if (!text) {
      return;
    }

    addReview({
      id: `review-${Date.now()}`,
      authorId: currentUser?.id ?? "alice",
      text,
      timestamp: new Date().toISOString(),
      replies: [],
    });
    setNewReflection("");
    setShowReflectionForm(false);
  };

  const handleAddReply = (reviewId: string) => {
    const text = replyText[reviewId]?.trim();
    if (!text) {
      return;
    }

    addReviewReply(reviewId, {
      id: `reply-${Date.now()}`,
      authorId: currentUser?.id ?? "alice",
      text,
      timestamp: new Date().toISOString(),
    });
    setReplyText((prev) => ({ ...prev, [reviewId]: "" }));
  };

  const exportMarkdown = useMemo(() => {
    if (reviews.length === 0) {
      return "";
    }

    return reviews
      .map((review) => {
        const author = members.find((member) => member.id === review.authorId);
        const header = `## ${author?.name ?? "Unknown"} (${formatTimestamp(review.timestamp)})`;
        const body = review.text;
        const replies = review.replies
          .map((reply) => {
            const replyAuthor = members.find((member) => member.id === reply.authorId);
            return `> **${replyAuthor?.name ?? "Unknown"}** (${formatTimestamp(reply.timestamp)}):\n> ${reply.text}`;
          })
          .join("\n\n");

        return [header, body, replies ? `### Replies\n\n${replies}` : null].filter(Boolean).join("\n\n");
      })
      .join("\n\n---\n\n");
  }, [members, reviews]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hackathon Reflection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review) => {
          const author = members.find((member) => member.id === review.authorId);
          return (
            <div key={review.id} className="space-y-4 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={author?.avatarUrl} alt={author?.name} />
                  <AvatarFallback>{author?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{author?.name ?? "Unknown"}</p>
                  <p className="text-xs text-muted-foreground">{formatTimestamp(review.timestamp)}</p>
                </div>
              </div>
              <p className="leading-7">{review.text}</p>

              {review.replies.length > 0 && (
                <div className="space-y-3 rounded-2xl bg-slate-50 p-3">
                  <p className="text-sm font-semibold">Replies</p>
                  {review.replies.map((reply) => {
                    const replyAuthor = members.find((member) => member.id === reply.authorId);
                    return (
                      <div key={reply.id} className="rounded-xl border border-slate-200 bg-white p-3">
                        <p className="text-sm font-semibold">{replyAuthor?.name ?? "Unknown"}</p>
                        <p className="text-xs text-muted-foreground mb-2">{formatTimestamp(reply.timestamp)}</p>
                        <p>{reply.text}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold">Reply as {currentUser?.name}</p>
                <Textarea
                  value={replyText[review.id] || ""}
                  onChange={(event) =>
                    setReplyText((prev) => ({ ...prev, [review.id]: event.target.value }))
                  }
                  placeholder="Write a reply..."
                  className="min-h-[120px]"
                />
                <Button size="sm" onClick={() => handleAddReply(review.id)}>
                  Submit Reply
                </Button>
              </div>
            </div>
          );
        })}

        {showReflectionForm ? (
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="font-semibold">Add Reflection</p>
            <Textarea
              value={newReflection}
              onChange={(event) => setNewReflection(event.target.value)}
              placeholder="What did you learn? What were the pain points?"
              className="min-h-[140px]"
            />
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleAddReflection}>Submit Reflection</Button>
              <Button variant="outline" onClick={() => setShowReflectionForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setShowReflectionForm(true)}>Add Reflection</Button>
        )}

        <Dialog>
          <DialogTrigger>
            <Button variant="outline">Export as Document</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Hackathon Reflection Document</DialogTitle>
              <DialogDescription>Copy the compiled markdown export below.</DialogDescription>
            </DialogHeader>
            <pre className="rounded-md bg-slate-950 p-4 text-sm text-slate-100 whitespace-pre-wrap">
              {exportMarkdown || "No reflections yet."}
            </pre>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
