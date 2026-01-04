import SettingSideBars from "@/components/SettingSideBars";
import React from "react";

export default function SettingLayout({ children }) {
  return (
    <div className="flex w-full h-full">
      <div className="w-48 flex-shrink-0 border-r bg-gray-100">
        <SettingSideBars />
      </div>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}

