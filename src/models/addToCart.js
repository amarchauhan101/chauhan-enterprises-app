import mongoose from "mongoose";

const AddToCartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required:true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required:true
        },
        title: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
        image: String,
      },
    ],
  },
  { timestamps: true }
);

const AddToCart =
  mongoose.models.AddToCart || mongoose.model("AddToCart", AddToCartSchema);
export default AddToCart;