"use client";
import React, { useEffect, useState } from "react";
import QuantityAndAction from "./QuantityAndAction";
import { Label } from "./ui/label";
import { ShoppingBag, Truck, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

function CartPage({  userId }) {
  const {cart,setCart} = useCart();
  const amount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  console.log("cartt in cartpage",cart);
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl mx-6 px-8 shadow-2xl border border-amber-200">
          <ShoppingBag className="w-24 h-24 text-amber-300 mx-auto mb-6" />
          <h2 className="text-3xl font-light bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent mb-4">
            Your cart is empty
          </h2>
          <p className="text-amber-700 mb-8 max-w-md mx-auto leading-relaxed">
            Looks like you haven't added any items to your cart yet. Start
            shopping to find some great products!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  console.log("cart in cartpage", cart);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-amber-50 to-orange-50 border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">Shopping Cart</h1>
              <p className="text-amber-700 mt-2 font-medium">
                {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => {
              const product = {
                id: item.productId,
                title: item.title,
                price: item.price,
                image: item.image,
              };
              return (
                <div
                  key={item._id}
                  className="bg-gradient-to-r from-white via-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-amber-200 hover:shadow-xl hover:border-amber-300 transition-all transform hover:scale-[1.02]"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                        <div className="w-full sm:w-32 h-48 sm:h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl overflow-hidden shadow-inner">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-amber-900 capitalize mb-1">
                            {item.title}
                          </h3>
                          <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            ${item.price}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex-shrink-0">
                          <QuantityAndAction userId={userId} product={product} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl p-6 shadow-xl border border-amber-200 sticky top-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent mb-6">Order Summary</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-full mb-6"></div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 font-medium">Subtotal ({cart.items.length} items)</span>
                  <span className="text-amber-900 font-semibold">${amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 font-medium">Shipping</span>
                  <span className="text-emerald-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-700 font-medium">Tax</span>
                  <span className="text-amber-900 font-semibold">$0</span>
                </div>
                <div className="border-t border-amber-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-900">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      ${amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6 py-4 border-y border-amber-200 bg-amber-50/50 rounded-lg px-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-emerald-500" />
                  <span className="text-amber-800 font-medium">Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-amber-800 font-medium">Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
