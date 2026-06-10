"use client";

import { Bell } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type ActiveTab, useUiStore } from "@/stores/ui-store";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const activeTab = useUiStore((state) => state.activeTab);
  const setTab = useUiStore((state) => state.setTab);
  const notificationCount = useUiStore((state) => state.notifications.length);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="text-lg font-semibold tracking-tight">OpenForge</div>
          <div className="flex items-center gap-4">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setTab(value as ActiveTab)}
            >
              <TabsList>
                <TabsTrigger value="hackathon">Hackathon Sprint</TabsTrigger>
                <TabsTrigger value="foss">FOSS Leap</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tooltip>
              <TooltipTrigger className="relative flex h-9 w-9 items-center justify-center rounded-md border bg-background">
                <Bell className="h-4 w-4" aria-hidden="true" />
                {notificationCount > 0 ? (
                  <Badge className="absolute -right-2 -top-2 h-5 min-w-5 justify-center px-1 text-[11px]">
                    {notificationCount}
                  </Badge>
                ) : null}
                <span className="sr-only">
                  {notificationCount} notifications
                </span>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
