"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjectStore } from "@/stores/project-store";
import { useUiStore } from "@/stores/ui-store";
import { TechStack } from "@/components/hackathon/tech-stack";

const FEATURES = [
  "Real-time chat",
  "AI matching",
  "Calendar integration",
  "Push notifications",
  "Dark mode",
] as const;

export function MvpPoll() {
  const setSelectedFeatures = useProjectStore((state) => state.setSelectedFeatures);
  const selectedFeatures = useProjectStore((state) => state.selectedFeatures);
  const pushNotification = useUiStore((state) => state.pushNotification);

  const [votes, setVotes] = useState<Record<string, number>>(() => {
    return FEATURES.reduce((acc, feature) => ({ ...acc, [feature]: 0 }), {});
  });

  const handleUpvote = (feature: string) => {
    setVotes((prev) => ({ ...prev, [feature]: prev[feature] + 1 }));
  };

  const handleDownvote = (feature: string) => {
    setVotes((prev) => ({ ...prev, [feature]: Math.max(0, prev[feature] - 1) }));
  };

  const handleFinalize = () => {
    const featuresWithVotes = FEATURES.filter((feature) => votes[feature] > 0);
    setSelectedFeatures(featuresWithVotes);
    pushNotification("MVP finalized!");
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>MVP Feature Poll</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {FEATURES.map((feature) => (
            <div
              key={feature}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-sm font-medium">{feature}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownvote(feature)}
                >
                  -
                </Button>
                <span className="w-8 text-center text-sm">{votes[feature]}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpvote(feature)}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={handleFinalize} className="mt-2">
            Finalize MVP
          </Button>
        </CardContent>
      </Card>
      {selectedFeatures.length > 0 && <TechStack />}
    </div>
  );
}
