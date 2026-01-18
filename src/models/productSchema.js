
import mongoose from "mongoose";

// Import subCategories directly from data file instead of models
const getSubCategories = async () => {
  const { subCategories } = await import("@/data/subCategory");
  return subCategories;
};

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type:String,
      required:true,
      trim:true
    },
    subCategory: {
      type: String,
      required: true,
    },
    image: {
      type: [String], // Changed to array to support multiple images
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product
  ? (delete mongoose.models.Product, mongoose.model("Product", productSchema))
  : mongoose.model("Product", productSchema);
export default Product;
