import AdminOrder from '@/components/AdminOrder'
import React from 'react'
import { fetchAllProducts } from '@/app/action/fetchCategory';
import { auth } from '@/lib/auth';
import { getAllOrders } from '@/app/action/getOrder';

async function page() {
  const user = await auth();
  
  // Check if user is authenticated
  if (!user || !user.user) {
    return (
      <div className='w-full'>
        <DashBoardHeader/>
        <div className="p-4">
          <p>Please log in to access orders.</p>
        </div>
      </div>
    );
  }
  
  const userId = user?.user?.id;
  const products = await fetchAllProducts(userId);
  const {order} = await getAllOrders();
  console.log("Orders:", order);
  
  return (
    <div className='w-full'>
      <AdminOrder order={order} products={products}/>
    </div>
  )
}

export default page