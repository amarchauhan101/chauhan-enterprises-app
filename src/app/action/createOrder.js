"use server";

import { dbConnect } from "@/lib/db";
import razorpay from "@/lib/razorpay";
import Order from "@/models/OrderModel";
import userSchema from "@/models/userSchema";
import { success } from "zod";
import { getorder } from "./getOrder";

export const CreateOrder = async (userId) => {
  try {
    await dbConnect();
    const { items, amount } = await getorder(userId);
    
    console.log("Original amount:", amount);
    console.log("Amount type:", typeof amount);
    console.log("Items:", items);

    // Validate amount
    if (!amount || amount <= 0) {
      return { success: false, error: "Invalid amount" };
    }

    // Check if amount is reasonable (max 1,00,000 INR for regular accounts)
    if (amount > 100000) {
      return { 
        success: false, 
        error: `Order amount ₹${amount.toLocaleString()} exceeds maximum limit of ₹1,00,000. Please reduce cart items.` 
      };
    }

    const order = await Order.create({
      userId,
      items: items,
      TotalAmount: amount,
      paymentStatus: "pending",
    });

    // Convert to paise (Razorpay expects amount in paise)
    const amountInPaise = Math.round(amount * 100);
    console.log("Amount in paise:", amountInPaise);
    console.log("Amount in rupees:", amountInPaise / 100);

    // Validate paise amount (1,00,000 INR = 10,000,000 paise)
    if (amountInPaise > 10000000) { 
      return { 
        success: false, 
        error: `Amount ₹${amount.toLocaleString()} exceeds Razorpay transaction limit` 
      };
    }

    //create razorpay order
    const razorOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: order._id.toString(),
    });

    order.razorpayOrderId = razorOrder.id;
    await order.save();
    console.log("Razorpay order created successfully:", razorOrder);

    return {
      success: true,
      key: process.env.RAZOR_KEY,
      amount,
      orderId: razorOrder.id,
    };
  } catch (err) {
    console.log("Razorpay error:", err);
    console.log("Error details:", err.error);
    
    if (err.statusCode === 400) {
      if (err.error?.description?.includes('Amount exceeds')) {
        return { success: false, error: "Order amount is too high for your account" };
      }
      if (err.error?.description?.includes('amount')) {
        return { success: false, error: "Invalid amount format" };
      }
    }
    
    return { 
      success: false, 
      error: err.error?.description || "Payment gateway error"
    };
  }
};


