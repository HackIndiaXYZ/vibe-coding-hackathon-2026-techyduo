"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { Progress } from "@/components/ui/progress";
import { useFossStore } from "@/stores/foss-store";
import { useProjectStore } from "@/stores/project-store";
import { useUiStore } from "@/stores/ui-store";
import { mockFossScan } from "@/lib/mock-data";

export function FossScanner() {
  const scanResult = useFossStore((state) => state.scanResult);
  const cleanDiff = useFossStore((state) => state.cleanDiff);
  const generatedReadme = useFossStore((state) => state.generatedReadme);
  const setScanResult = useFossStore((state) => state.setScanResult);
  const setCleanDiff = useFossStore((state) => state.setCleanDiff);
  const setReadme = useFossStore((state) => state.setReadme);
  const pushNotification = useUiStore((state) => state.pushNotification);
  const ideaText = useProjectStore((state) => state.ideaText);

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult(mockFossScan);
          pushNotification("Repository scan complete!");
          return 100;
        }
        return prev + 50;
      });
    }, 1000);
  };

  const handleCleanCode = () => {
    if (!cleanDiff) {
      setCleanDiff({
        before: "// Before: Inefficient nested loops\nfor (let i = 0; i < arr.length; i++) {\n  for (let j = 0; j < arr.length; j++) {\n    console.log(arr[i], arr[j]);\n  }\n}",
        after: "// After: Optimized with Set\nconst seen = new Set();\nfor (const item of arr) {\n  if (!seen.has(item)) {\n    seen.add(item);\n    console.log(item);\n  }\n}",
      });
    }
  };

  const handleGenerateReadme = () => {
    const readme = `# ${ideaText || "Project"}\n\n## Overview\n\nThis project was generated based on the idea: ${ideaText || "No idea provided"}.\n\n## Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Installation\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## License\n\nMIT`;
    setReadme(readme);
    pushNotification("README generated!");
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>FOSS Scanner</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={handleScan} disabled={isScanning}>
            {isScanning ? "Scanning..." : "Scan Repository"}
          </Button>

          {isScanning && (
            <div className="space-y-2">
              <Progress value={scanProgress} />
              <p className="text-sm text-muted-foreground text-center">
                Scanning repository...
              </p>
            </div>
          )}

          {scanResult && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Scan Results</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="outline">Score: {scanResult.score}</Badge>
                <Badge variant={scanResult.secretsFound === 0 ? "default" : "destructive"}>
                  Secrets Found: {scanResult.secretsFound}
                </Badge>
                <Badge variant={scanResult.hasLicense ? "default" : "secondary"}>
                  License: {scanResult.hasLicense ? "Yes" : "No"}
                </Badge>
                <Badge variant="outline">Readme Quality: {scanResult.readmeQuality}</Badge>
                <Badge variant={scanResult.contributingExists ? "default" : "secondary"}>
                  Contributing: {scanResult.contributingExists ? "Yes" : "No"}
                </Badge>
              </CardContent>
            </Card>
          )}

          <Dialog>
            <DialogTrigger>
              <Button variant="outline" onClick={handleCleanCode}>
                Clean Code
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Code Improvement Suggestion</DialogTitle>
                <DialogDescription>Before and after code comparison</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Before</h4>
                  <pre className="bg-muted p-3 rounded text-xs overflow-auto">
                    {cleanDiff?.before || "No diff available"}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">After</h4>
                  <pre className="bg-muted p-3 rounded text-xs overflow-auto">
                    {cleanDiff?.after || "No diff available"}
                  </pre>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleGenerateReadme}>
            Generate README
          </Button>

          {generatedReadme && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Generated README</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-3 rounded text-xs overflow-auto whitespace-pre-wrap">
                  {generatedReadme}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
