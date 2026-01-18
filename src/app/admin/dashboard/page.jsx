import { getAllOrders } from '@/app/action/getOrder'
import AdminDashBoard from '@/components/AdminDashBoard'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function DashBoard() {
  const userInAuth = await auth();
  const user = userInAuth?.user
  
  console.log("Dashboard - User:", user?.email);
  console.log("Dashboard - User role:", user?.role);
  
  // Check authentication
  if (!userInAuth || !user) {
    console.log("No user found, redirecting to signin");
    redirect('/auth/signin');
  }
  
  // Check admin role
  if (user.role !== 'admin') {
    console.log("User is not admin, redirecting to unauthorized");
    redirect('/unauthorized');
  }
  
  const getAllorder = await getAllOrders();
  const Allorders = getAllorder.order;
  
  return (
    <div className='w-full'>
        <AdminDashBoard Allorders={Allorders} user={user} />
    </div>
  )
}

export default DashBoard