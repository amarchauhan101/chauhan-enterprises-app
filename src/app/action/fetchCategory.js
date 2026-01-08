"use server";

import { dbConnect } from "@/lib/db";
import CategoryModel from "@/models/category";
import Product from "@/models/productSchema";
import UserActivity from "@/models/UserActivity";
import { success } from "zod";

export const Categoryfetch = async (param) => {
  try {
    await dbConnect();
    console.log("param",param);
    const data = await Product.find({ category: param });
    if (!data) {
      console.log("unable to find the product");
    }
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err in fetching",err);
  }
};

export const fetchAllProducts = async (userId) => {
  const product = await Product.find({});
  return {
    products: JSON.parse(JSON.stringify(product)),
  };
  // console.log("products in backend",product);
};

export const fetchSingleDetail = async (productId) => {
  try {
    await dbConnect();
    console.log("before res");
    const res = await Product.findOne({ _id: productId });
    console.log("res after");
    if (!res) {
      console.log("unable to fetch the detail of category");
    }
    // const dataAlreayPresent = await UserActivity.findOne({ userId, productId });
    // if (!dataAlreayPresent) {
    //   await UserActivity.create({
    //     userId,
    //     productId,
    //     action: "viewed",
    //   });
    // }
    console.log("res", res);
    return JSON.parse(JSON.stringify(res));
  } catch (err) {
    console.log(err);
  }
};

export const fetchBasedOnActivity = async (userId) => {
  try {
    const productDetails = await UserActivity.findOne({ userId: userId })
      .populate("productId")
      .sort({ createdAt: -1 });
    if (!productDetails) {
      return {
        success: false,
        message: "userid is not available in userActivity",
      };
    }
    console.log("productsDetails", productDetails);
    const subCategoryOfUserProduct = productDetails?.productId?.subCategory;
    console.log(subCategoryOfUserProduct);
    const RecommendedProducts = await Product.find({
      subCategory: subCategoryOfUserProduct,
    }).limit(10);
    console.log("RecommendedProducts", RecommendedProducts);
    return {
      success: true,
      RecommendedProduct: JSON.parse(JSON.stringify(RecommendedProducts)),
    };
  } catch (err) {
    console.log(err);
  }
};

export const addCategory = async (PrevState, formData) => {
  try {
    await dbConnect();
    const category = formData.get("category");
    const subCategory = formData.get("subCategory");

    console.log(category, subCategory);
    const subCategories = subCategory.split(",").map((item) => item.trim());

    const NewCategory = await CategoryModel.create({
      name: category,
      subCategory: subCategories,
    });
    return { success: true, data: JSON.parse(JSON.stringify(NewCategory)) };
  } catch (err) {
    console.log("err in adding",err);
    return { success: false, error: err.message };
  }
};

export const fetchAllCategories = async () => {
  try {
    await dbConnect();
    const AllCategory = await CategoryModel.find();
    console.log(AllCategory);
    return { JSON: JSON.parse(JSON.stringify(AllCategory)), success: true };
  } catch (err) {
    console.log(err);
  }
};
