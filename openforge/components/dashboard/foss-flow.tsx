"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { mockFossScan } from "@/lib/mock-data";
import { useFossStore } from "@/stores/foss-store";

export function FossFlow() {
  const scanResult = useFossStore((state) => state.scanResult);
  const setScanResult = useFossStore((state) => state.setScanResult);

  useEffect(() => {
    if (!scanResult) {
      setScanResult(mockFossScan);
    }
  }, [scanResult, setScanResult]);

  const result = scanResult ?? mockFossScan;

  return (
    <section className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>FOSS Readiness</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Score</span>
              <span className="font-medium">{result.score}/100</span>
            </div>
            <Progress value={result.score} />
          </div>
          <Separator />
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>Secrets found: {result.secretsFound}</div>
            <div>License present: {result.hasLicense ? "Yes" : "No"}</div>
            <div>README quality: {result.readmeQuality}/100</div>
            <div>
              CONTRIBUTING guide: {result.contributingExists ? "Yes" : "No"}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Next Open-Source Steps</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <div className="rounded-md border p-3">Generate CONTRIBUTING.md</div>
          <div className="rounded-md border p-3">
            Tighten README setup instructions
          </div>
          <div className="rounded-md border p-3">
            Add first-good-issue labels for contributors
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
