"use server";

import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/db";
import Product from "@/models/productSchema";
import { redirect } from "next/navigation";

export async function uploadFiles(prevState, formData) {
  await dbConnect();
  try {
    // Get form data
    const title = formData.get("title");
    const price = formData.get("price");
    const imageFiles = formData.getAll("image"); // Get all image files as array
    const category = formData.get("category");
    const subCategory = formData.get("subCategory");
    const stocks = formData.get("stock");

    // Debug: Log all form data
    console.log("Form Data Received:");
    console.log("Title:", title);
    console.log("Price:", price);
    console.log("Category:", category);
    console.log("subCategory", subCategory);
    console.log("Image files:", imageFiles);
    console.log("Number of files:", imageFiles.length);
    console.log("stocks", stocks);

    // Validation
    if (
      !title ||
      !price ||
      !imageFiles ||
      imageFiles.length === 0 ||
      !category ||
      !subCategory ||
      !stocks
    ) {
      console.log("Validation failed - missing fields:");
      console.log("Title missing:", !title);
      console.log("Price missing:", !price);
      console.log("Images missing:", !imageFiles || imageFiles.length === 0);
      console.log("Category missing:", !category);
      console.log("subCategory missing", !subCategory);
      console.log("missing stocks", !stocks);
      return { error: "All fields are required", success: false };
    }

    // Validate that we have actual files
    const validFiles = imageFiles.filter((file) => file && file.size > 0);
    if (validFiles.length === 0) {
      return {
        error: "Please select at least one valid image file",
        success: false,
      };
    }

    let AllProducts = [];

    for (const file of validFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "nextjs_uploads",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });
      const productData = {
        title: title,
        image: uploadResponse.secure_url, // This should be an array of strings
        price: parseFloat(price),
        category: category,
        subCategory: subCategory,
        stock: parseInt(stocks, 10),
      };
      console.log("Product data:", productData);
      console.log("Product data image:", productData.image);

      const newProduct = await Product.create(productData);
      AllProducts.push(newProduct);
    }

    // Convert file to buffer

    // Save to database
    // console.log("Attempting to save product with data:");
    // console.log("All uploaded images:", allImageUrls);
    // console.log(
    //   "Image URLs type:",
    //   typeof allImageUrls,
    //   Array.isArray(allImageUrls)
    // );

    // console.log("Product created successfully:", newProduct);
    // console.log("Product category in DB:", newProduct.category);
    // console.log("Product subCategory in DB:", newProduct.subCategory);

    return {
      success: true,
      error: null,
      products: AllProducts.map((p) => ({
        id: p._id.toString(),
        title: p.title,
        price: p.price,
        category: p.category,
        subCategory: p.subCategory,
        stock: p.stock,
        image: p.image,
      })),
    };
  } catch (error) {
    console.error("Upload Error:", error);
    return {
      error: error.message || "Upload failed",
      success: false,
    };
  }
  redirect("/");
}


