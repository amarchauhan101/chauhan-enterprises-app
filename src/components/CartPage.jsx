"use client";
import React, { useEffect, useState } from "react";
import QuantityAndAction from "./QuantityAndAction";
import { Label } from "./ui/label";

function CartPage({ cart, userId }) {
  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty</p>;
  }
  console.log("cart in cartpage", cart);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.items.map((item) => {
        const product = {
          id: item.productId, // ✅ real product id
          title: item.title,
          price: item.price,
          image: item.image,
        };
        return (
          <div className="w-full bg-zinc-400 rounded-md">
            <div
              key={item._id}
              className="max-w-screen-xl mx-auto items-center justify-between flex gap-10 px-4 py-4"
            >
              <div className="flex gap-4 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 md:w-60 md:h-60 object-cover rounded"
                />
                <div className="flex flex-col gap-2 justify-center">
                  <h2 className="font-semibold text-sm sm:text-2xl ">
                    {item.title}
                  </h2>
                  <h2 className="font-semibold text-sm sm:text-2xl">
                    ₹{item.price}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col ">
                <QuantityAndAction userId={userId} product={product} />
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-6 flex flex-col gap-2">
        <p className="text-sm font-bold ">Summary</p>
        <hr className="border border-dashed border-gray-400 "></hr>

        <div className="flex justify-between items-center">
          <Label className="font-bold">SubTotal:</Label>
          <p className="font-bold">₹{cart.amount}</p>
        </div>
        <div className="flex justify-between items-center">
          <Label className="font-bold">Tax:</Label>
          <p className="font-bold">₹0</p>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
