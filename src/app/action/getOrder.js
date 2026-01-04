"use server";

import mongoose from "mongoose";
import { dbConnect } from "@/lib/db";
import AddToCart from "@/models/addToCart";
import Order from "@/models/OrderModel";
import Product from "@/models/productSchema";
import User from "@/models/userSchema";

export const getorder = async (userId) => {
  try {
    const cart = await AddToCart.findOne({ userId: userId });
    if (!cart) {
      console.log("user not exist in these cart");
    }
    const amount = await cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return {
      items: JSON.parse(JSON.stringify(cart.items)),
      amount,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getStocksBasedOnPayment = async (userId, productId, qty) => {
  try {
    const updateStockBasedOnAction = await Product.findOneAndUpdate(
      { _id: productId, stock: { $gte: qty } },
      { $inc: { stock: -qty } },
      { new: true }
    );
    if (!updateStockBasedOnAction) {
      return {
        success: false,
        message: "Out of stock",
      };
    }
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getAllOrders = async () => {
  try {
    await dbConnect();
    console.log("Database connected, attempting to find orders...");
    const AllOrder = await Order.find({}).populate("userId","username email")
    console.log("AllOrder", AllOrder);
    console.log("Order count:", AllOrder.length);

    if (!AllOrder || AllOrder.length === 0) {
      return {
        success: false,
        message: "failed to find the orders",
      };
    }
    return { success: true, order: JSON.parse(JSON.stringify(AllOrder)) };
  } catch (er) {
    console.log("Error in getAllOrders:", er);
    return {
      success: false,
      message: "Error occurred while fetching orders",
    };
  }
};
