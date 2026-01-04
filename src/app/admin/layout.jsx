import DashBoardHeader from "@/components/DashBoardHeader";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-64 flex-shrink-0">
        <DashBoardHeader />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}