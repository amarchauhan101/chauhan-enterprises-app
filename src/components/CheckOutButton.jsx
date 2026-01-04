"use client";

import React from "react";


import { Button } from "./ui/button";
import { CreateOrder } from "@/app/action/createOrder";
// import razorpay from "@/lib/razorpay";

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
    <div className="sm:w-fit w-full">
      <Button className="bg-black text-white sm:px-10 sm:py-6 rounded sm:w-fit w-full" onClick={handlePay}>Pay Now</Button>
    </div>
  );
}

export default CheckOutButton;
