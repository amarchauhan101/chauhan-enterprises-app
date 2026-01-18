import DashBoardHeader from "@/components/DashBoardHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({ children }) {
  const userInAuth = await auth();
  const user = userInAuth?.user;
  console.log("user role in user",user?.role);
  
  console.log("Admin Layout - User:", user?.email);
  console.log("Admin Layout - User role:", user?.role);
  
  // Check authentication
  if (!userInAuth || !user) {
    console.log("Admin Layout: No user found, redirecting to signin");
    redirect('/auth/signin');
  }
  
  // Check admin role
  if (user.role !== 'admin') {
    console.log("Admin Layout: User is not admin, redirecting to unauthorized");
    redirect('/unauthorized');
  }

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
