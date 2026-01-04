import { auth } from "@/lib/auth";
import React from "react";

async function page() {
  const userInAuth = await auth();
  const user = userInAuth.user;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      {/* Your settings content will go here */}
      <div className="text-gray-600">
        Welcome to settings, {user?.username || 'User'}
      </div>
    </div>
  );
}

export default page;
