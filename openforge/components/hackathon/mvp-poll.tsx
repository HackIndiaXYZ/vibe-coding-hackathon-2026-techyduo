"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjectStore } from "@/stores/project-store";
import { useTeamStore } from "@/stores/team-store";
import { useUiStore } from "@/stores/ui-store";

const DEFAULT_FEATURES = [
  "Real-time chat",
  "AI matching",
  "Calendar integration",
  "Push notifications",
  "Dark mode",
];
const CURRENT_USER_ID = "alice";

export function MvpPoll() {
  const members = useTeamStore((state) => state.members);
  const selectedFeatures = useProjectStore((state) => state.selectedFeatures);
  const setSelectedFeatures = useProjectStore((state) => state.setSelectedFeatures);
  const pushNotification = useUiStore((state) => state.pushNotification);

  const [features, setFeatures] = useState<string[]>(DEFAULT_FEATURES);
  const [featureInput, setFeatureInput] = useState("");
  const [votes, setVotes] = useState<Record<string, string[]>>(() => {
    const ids = members.length > 0 ? members.map((member) => member.id) : [CURRENT_USER_ID];
    return DEFAULT_FEATURES.reduce((acc, feature, index) => {
      const voteCount = Math.min(3, Math.max(2, 2 + (index % 2)));
      const assigned = Array.from(
        new Set(
          Array.from({ length: voteCount }, (_, i) => ids[(index + i) % ids.length]),
        ),
      );
      return { ...acc, [feature]: assigned };
    }, {} as Record<string, string[]>);
  });

  const voteMembers = useMemo(
    () => members.reduce<Record<string, typeof members[0]>>((acc, member) => {
      acc[member.id] = member;
      return acc;
    }, {}),
    [members],
  );

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed || features.includes(trimmed)) {
      setFeatureInput("");
      return;
    }

    setFeatures((current) => [...current, trimmed]);
    setVotes((current) => ({
      ...current,
      [trimmed]: [CURRENT_USER_ID],
    }));
    setFeatureInput("");
  };

  const handleRemoveFeature = (feature: string) => {
    setFeatures((current) => current.filter((item) => item !== feature));
    setVotes((current) => {
      const next = { ...current };
      delete next[feature];
      return next;
    });
  };

  const handleVote = (feature: string, upvote: boolean) => {
    setVotes((current) => {
      const currentVotes = new Set(current[feature] ?? []);
      if (upvote) {
        currentVotes.add(CURRENT_USER_ID);
      } else {
        currentVotes.delete(CURRENT_USER_ID);
      }
      return { ...current, [feature]: Array.from(currentVotes) };
    });
  };

  const handleFinalize = () => {
    const consensusFeatures = features.filter(
      (feature) => (votes[feature]?.length ?? 0) >= 2,
    );
    setSelectedFeatures(consensusFeatures);
    pushNotification("MVP finalized!");
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>MVP Feature Poll</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col gap-2 rounded-lg border border-slate-200 p-4">
            <label className="text-sm font-medium">Add a new feature</label>
            <div className="flex gap-2">
              <input
                value={featureInput}
                onChange={(event) => setFeatureInput(event.target.value)}
                placeholder="New feature name"
                className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
              <Button onClick={handleAddFeature} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {features.map((feature) => {
            const voterIds = votes[feature] ?? [];
            return (
              <div key={feature} className="grid gap-3 rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium">{feature}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{voterIds.length} vote{voterIds.length === 1 ? "" : "s"}</span>
                      <span>• Consensus needs 2+</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feature)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100"
                    aria-label={`Remove ${feature}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {voterIds.map((memberId) => {
                      const member = voteMembers[memberId];
                      return (
                        <Avatar
                          key={memberId}
                          className="h-8 w-8 border-2 border-white shadow-sm"
                        >
                          <AvatarImage src={member?.avatarUrl} alt={member?.name} />
                          <AvatarFallback>{member?.name?.[0] ?? "?"}</AvatarFallback>
                        </Avatar>
                      );
                    })}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Voted members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(feature, false)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center text-sm">{voterIds.length}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(feature, true)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          <Button onClick={handleFinalize} className="mt-2">
            Finalize MVP
          </Button>
        </CardContent>
      </Card>
      {selectedFeatures.length > 0 ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
          Consensus features selected: {selectedFeatures.join(", ")}
        </div>
      ) : null}
    </div>
  );
}
