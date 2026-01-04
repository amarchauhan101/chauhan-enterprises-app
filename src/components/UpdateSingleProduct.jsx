import { fetchSingleDetail } from "@/app/action/fetchCategory";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { subCategories } from "@/data/subCategory";
import { Button } from "./ui/button";
import { updateProduct } from "@/app/action/updateProduct";
import { useRouter } from "next/navigation";

function UpdateSingleProduct({ productId, isModalOpen, setIsModalOpen }) {
  const [Product, setProduct] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("files in handleimagechange", files);

    if (files.length === 0) {
      setPreviewImage(null);
      return;
    }

    const preview = [];
    let loadedCount = 0;

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview[index] = e.target.result;
        loadedCount++;
        if (loadedCount === files.length) {
          setPreviewImage([...preview]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  console.log(previewImage);
  console.log(
    "productId,isModalOpen,setIsModalOpen",
    productId,
    isModalOpen,
    setIsModalOpen
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      console.log("formdata in handlesubmit",formData);

      // Add product ID to form data
      formData.append("productId", productId);
      

      // Handle file uploads if there are new images
      const fileInput = e.target.querySelector('input[type="file"]');
      if (fileInput.files.length > 0) {
        Array.from(fileInput.files).forEach((file, index) => {
          formData.append(`images`, file);
        });
      }

      // Call the update product action
      const result = await updateProduct(null, formData);

      if (result.success) {
        alert("Product updated successfully!");
        setIsModalOpen(false);
        // Optionally refresh the product data
        router.refresh();
      } else {
        alert(result.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = async () => {
    const res = await fetchSingleDetail(productId);
    setProduct(res);

    // Set category and subcategory for the selects
    if (res.category) {
      setSelectedCategory(res.category);
      setSubCategory(subCategories[res.category] || []);
    }
  };
  useEffect(() => {
    getProduct();
  }, [productId]);
  console.log(Product);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Product Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter product title"
            required
            className="mt-1"
            value={Product.title || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            required
            value={Product.price || ""}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            value={Product.category || ""}
            required
            onChange={(e) => {
              const value = e.target.value;
              setSelectedCategory(value);
              setSubCategory(subCategories[value] || []);
              setProduct((prev) => ({
                ...prev,
                category: value,
                subCategory: "", // Reset subcategory when category changes
              }));
            }}
            className="mt-1 w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            style={{
              height: "2.5rem",
              appearance: "menulist",
            }}
          >
            <option value="">Select Category</option>
            {Object.keys(subCategories).map((cat) => {
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <Label htmlFor="subCategory">SubCategory</Label>
          <select
            id="subcategory"
            name="subCategory"
            required
            value={Product.subCategory || ""}
            onChange={(e) => {
              setProduct((prev) => ({
                ...prev,
                subCategory: e.target.value,
              }));
            }}
            disabled={!selectedCategory}
            className="mt-1 w-full px-3 py-2 text-base border border-gray-300 rounded-md bg-white"
          >
            <option value="">Select SubCategory</option>
            {subcategory.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            value={Product.stock || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Product Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-1"
          />
          {previewImage && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {previewImage.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx}`}
                  className="w-32 h-32 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Updating Product..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}

export default UpdateSingleProduct;
