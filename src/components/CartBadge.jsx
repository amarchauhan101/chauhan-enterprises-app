'use client'
import React from 'react'
import { useCart } from "@/app/context/CartContext";
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
function CartBadge() {
     const {cart} = useCart();
  return (
     <Link className="flex gap-2 relative" href="/cart">
            <span>
              <ShoppingCart className="relative" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart?.items?.length}
              </span>
            </span>
          </Link>
  )
}

export default CartBadge