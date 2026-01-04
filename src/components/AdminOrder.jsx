import React from 'react'
import TopHeaderOrder from './TopHeaderOrder'
import BottomHeaderOrder from './BottomHeaderOrder'
import OrderTable from './OrderTable'

function AdminOrder({order, products}) {
  return (
    <div>
      <TopHeaderOrder order={order} products={products}/>
      <BottomHeaderOrder order={order} products={products}/>
      <OrderTable order={order} products={products}/>
    </div>
  )
}

export default AdminOrder