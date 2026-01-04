import mongoose from "mongoose";

const category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subCategory: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const CategoryModel =  mongoose.models.CategoryModel || mongoose.model("CategoryModel", category) 

export default CategoryModel;