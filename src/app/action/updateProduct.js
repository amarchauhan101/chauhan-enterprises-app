"use server";

import { dbConnect } from "@/lib/db";
import Product from "@/models/productSchema";
import cloudinary from "@/lib/cloudinary";
import CategoryModel from "@/models/category";

export const DeleteProduct = async (prevState, formData) => {
  try {
    await dbConnect();
    const productId = formData.get("productId");
    if (!productId) {
      return Response.json({ success: false, message: "ProductId not found" });
    }
    const deleteProduct = await Product.findByIdAndDelete(productId);
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (prevState, formData) => {
  try {
    await dbConnect();

    // Get form data
    const productId = formData.get("productId");
    const title = formData.get("title");
    const price = formData.get("price");
    const category = formData.get("category");
    const subCategory = formData.get("subCategory");
    const stock = formData.get("stock");
    const imageFiles = formData.getAll("images");

    console.log("Update form data received:", {
      productId,
      title,
      price,
      category,
      subCategory,
      stock,
      imageFiles: imageFiles.length,
    });

    // Validation
    if (!productId) {
      return { success: false, message: "Product ID is required" };
    }

    if (!title || !price || !category || !subCategory || !stock) {
      return { success: false, message: "All fields are required" };
    }

    // Find the existing product
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return { success: false, message: "Product not found" };
    }

    // Validate subCategory against category before updating
    const { subCategories } = await import("@/data/subCategory");

    if (!category || !subCategory) {
      return {
        success: false,
        message: "Category and subCategory are required",
      };
    }

    if (!subCategories[category]) {
      return { success: false, message: "Invalid category selected" };
    }

    if (!subCategories[category].includes(subCategory)) {
      return {
        success: false,
        message: "Invalid subCategory for the selected category",
      };
    }

    // Prepare update data
    const updateData = {
      title,
      price: parseFloat(price),
      category,
      subCategory,
      stock: parseInt(stock),
      updatedAt: new Date(),
    };

    // Handle image uploads if new images are provided
    if (imageFiles && imageFiles.length > 0) {
      const validFiles = imageFiles.filter((file) => file && file.size > 0);

      if (validFiles.length > 0) {
        console.log("Processing new images:", validFiles.length);

        const uploadedImageUrls = [];

        for (const file of validFiles) {
          try {
            // Convert file to buffer
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Upload to Cloudinary
            const uploadResponse = await new Promise((resolve, reject) => {
              cloudinary.uploader
                .upload_stream(
                  {
                    folder: "products",
                    resource_type: "image",
                    transformation: [
                      { width: 800, height: 800, crop: "limit" },
                      { quality: "auto" },
                    ],
                  },
                  (error, result) => {
                    if (error) {
                      console.error("Cloudinary upload error:", error);
                      reject(error);
                    } else {
                      resolve(result);
                    }
                  }
                )
                .end(buffer);
            });

            uploadedImageUrls.push(uploadResponse.secure_url);
            console.log(
              "Image uploaded successfully:",
              uploadResponse.secure_url
            );
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
            return { success: false, message: "Error uploading images" };
          }
        }

        // Update with new images (replace existing images)
        updateData.image = uploadedImageUrls;
      }
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return { success: false, message: "Failed to update product" };
    }

    console.log("Product updated successfully:", updatedProduct._id);

    return {
      success: true,
      message: "Product updated successfully",
      product: JSON.parse(JSON.stringify(updatedProduct)),
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      message: "Internal server error: " + error.message,
    };
  }
};

export const BulkAction = async (selectedIds) => {
  console.log("selectedIds", selectedIds);

  for (const id of selectedIds) {
    const isProductIdAvailable = await Product.findOne({ _id: id });
    if (!isProductIdAvailable) {
      return { success: false, message: "productId is not available" };
    }
    await Product.findByIdAndDelete(id);
  }
  return { success: true, message: "Products deleted successfully" };
};

export const updateCategory = async (prevState, formData) => {
  try {
    await dbConnect();
    const category = formData.get("category");
    const subCategory = formData.get("subCategory");
    const CategoryId = formData.get("CategoryId");
    console.log("subcategory in updated", subCategory);

    const parsedSubCategory = subCategory.split(",").map((item) => item.trim());
    console.log(parsedSubCategory);

    console.log(category, subCategory, CategoryId);

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      CategoryId,
      {
        name: category,
        subCategory: parsedSubCategory,
      },
      { new: true }
    );
    if (!updatedCategory) {
      return Response.JSON({
        message: "failed to update the category",
      });
    }
    return {
      data: JSON.parse(JSON.stringify(updatedCategory)),
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategory = async (CategoryId) => {
  try {
    await dbConnect();
    // const CategoryId = formData.get("CategoryId");
    const DeleteProduct = await CategoryModel.findByIdAndDelete(CategoryId);
    if (!DeleteProduct) {
      return { success: false, message: "Failed to delete category" };
    }
    return { success: true, message: "Category deleted successfully" };
  } catch (err) {
    console.log(err);
  }
};
