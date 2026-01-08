"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFiles } from "@/app/action/uploadfiles";
import toast from "react-hot-toast";

import { subCategories } from "@/data/subCategory";
import { Cross, Delete, DeleteIcon,X } from "lucide-react";
import { useRouter } from "next/navigation";

function AddProduct({ setIsModalOpen }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [state, setAction] = useActionState(uploadFiles, {
    error: null,
    success: false,
  });
  const router = useRouter();

  const handleImageChange = (e) => {
    let preview = [];
    const files = Array.from(e.target.files);
    console.log("files in handleimagechange", files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.push(e.target.result);
        if (preview.length == files.length) {
          setPreviewImage(preview);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    console.log(state);
  }, [state]);
  useEffect(() => {
    if (state.success) {
      toast.success("Product uploaded successfully!");
      router.refresh();
      setPreviewImage(null);
    }
  }, [state.success]);
  console.log(previewImage);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white overflow-y-auto text-black rounded-lg shadow-lg ">
      <h1 className="text-2xl font-bold mb-6 text-center">Upload Product</h1>
      <span className="flex justify-end ">
        {" "}
        <Button className="p-2 rounded-full bg-red-600 hover:bg-red-600 text-white" onClick={() => setIsModalOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </span>
      {state.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.error}
        </div>
      )}

      <form action={setAction} className="space-y-4">
        <div>
          <Label htmlFor="title">Product Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter product title"
            required
            className="mt-1"
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
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            required
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSubCategory(subCategories[e.target.value] || []);
            }}
            className="mt-1 w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            style={{
              height: "2.5rem",
              appearance: "menulist",
            }}
          >
            select Category
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
            disabled={!selectedCategory}
            className="mt-1 w-full px-3 py-2 text-base border border-gray-300 rounded-md bg-white"
          >
            select subCategory
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
          <Input id="stock" name="stock" type="number" required />
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
            required
            className="mt-1"
          />
          {previewImage && (
            <div className="mt-2 grid grid-col-3 gap-2">
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

        <Button type="submit" className="w-full">
          Upload Product
        </Button>
      </form>
    </div>
  );
}

export default AddProduct;
