import DashBoardHeader from "@/components/DashBoardHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-64 flex-shrink-0">
        <SidebarProvider>
          <SidebarTrigger />
          <DashBoardHeader />
        </SidebarProvider>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
