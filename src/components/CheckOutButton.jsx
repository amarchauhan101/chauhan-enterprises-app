"use client";

import React from "react";
import { Button } from "./ui/button";
import { CreateOrder } from "@/app/action/createOrder";
import { CreditCard, Shield } from "lucide-react";

function CheckOutButton({ userId }) {
  const handlePay = async () => {
    const res = await CreateOrder(userId);
    if (!res.success) {
      return alert("Payment failed. Please try again.");
    }
    const option = {
      key: res.key,
      amount: res.amount * 100,
      currency: "INR",
      name: "Chauhan EnterPrises",
      description: "Order Payment",
      order_id: res.orderId,
      handler: async (response) => {
        const verifyres = await fetch("/api/verify", {
          method: "POST",
          body: JSON.stringify({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });
        const data = await verifyres.json();
        if(data.success)window.location.href("/success");
        else alert("payment failed in verification")
      },
      theme: { color: "#A0905C" },
    };
    const rzp = new window.Razorpay(option);
    rzp.open();
  };

  return (
    <div className="w-full space-y-4">
      <button
        onClick={handlePay}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
      >
        <CreditCard className="w-5 h-5" />
        Proceed to Checkout
      </button>
      
      <div className="flex items-center justify-center gap-2 text-xs text-amber-700 bg-amber-100 rounded-lg py-2 px-3">
        <Shield className="w-3 h-3 text-amber-600" />
        <span className="font-medium">Secure payment powered by Razorpay</span>
      </div>
    </div>
  );
}

export default CheckOutButton;
