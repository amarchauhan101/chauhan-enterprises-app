import mongoose from "mongoose";

const UserActivity = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    action:{
        type:String,
        enum:["viewed", "added_to_cart", "purchased"]
    },
  },

  { timestamps: true }
);

export default mongoose.models.UserActivity || mongoose.model("UserActivity", UserActivity);
