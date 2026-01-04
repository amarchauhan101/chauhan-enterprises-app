import AddToCart from "@/models/addToCart";
import Order from "../../../models/OrderModel";
import crypto from "crypto";
import UserActivity from "@/models/UserActivity";
import Product from "@/models/productSchema";

export async function POST(req) {
  try {
    const body = await req.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");

    console.log(expectedSignature);
    console.log(razorpaySignature);
    console.log(expectedSignature === razorpaySignature);
    if (expectedSignature !== razorpaySignature) {
      const order = await Order.findOne({ razorpayOrderId });

      // if (order && order.paymentStatus !== "failed") {
      //   for (let item of order.items) {
      //     await Product.findByIdAndUpdate(item.productId, {
      //       $inc: { stock: item.quantity },
      //     });
      //   }

      //   order.paymentStatus = "failed";
      //   await order.save();
      // }

      return Response.json({
        success: false,
        msg: "Payment verification failed",
      });
    }
    const order = await Order.findOne({ razorpayOrderId });

    if (!order) {
      return Response.json({ success: false, msg: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;
    await order.save();

    await AddToCart.findOneAndUpdate(
      { userId: order.userId },
      { items: [] } // remove all items
    );
    for (const item of order.items) {
      const productId = item.productId;

      await UserActivity.findOneAndUpdate(
        { userId: order.userId, productId },
        { action: "purchased" },
        { new: true }
      );
    }
    for (let item of order.items) {
      const updated = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          stock: { $gte: item.quantity },
        },
        { $inc: { stock: -item.quantity } }
      );
    }
    return Response.json({ success: true });
  } catch (err) {
    console.log("verify ERROR", err);
    return Response.json({ success: false });
  }
}
