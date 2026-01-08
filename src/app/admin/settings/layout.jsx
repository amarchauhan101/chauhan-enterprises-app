import SettingSideBars from "@/components/SettingSideBars";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function SettingLayout({ children }) {
  return (
    <div className="flex w-full h-full">
      <div className="w-48 flex-shrink-0 border-r bg-gray-100">
        <SidebarProvider>
          <SidebarTrigger />
          <SettingSideBars />
        </SidebarProvider>
      </div>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
