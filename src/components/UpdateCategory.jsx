import React, { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
// import { Label } from "@radix-ui/react-label";
import { subCategories } from "@/models/subCategories";
import { addCategory } from "@/app/action/fetchCategory";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/app/action/updateProduct";

function UpdateCategory({
  categories,
  isModalOpen,
  setIsModalOpen,
  setCategories,
  subCategories,
  setSubCategories,
  category,
  setCategory,
  selectedIds,
  isUpdated,
  setIsUpdated,
  isUpdatedModalOpen,
  setIsUpdatedModalOpen

}) {
  console.log("categories in updated catgory", categories);
  const ClickedCategory = categories.find((cat) => cat._id === selectedIds);
  console.log(ClickedCategory);

  const [newCategory, setNewCategory] = useState(
    ClickedCategory ? ClickedCategory.name : ""
  );
  const [newSubCategory, setNewSubCategory] = useState(
    ClickedCategory && Array.isArray(ClickedCategory.subCategory)
      ? ClickedCategory.subCategory.join(", ")
      : ClickedCategory
      ? ClickedCategory.subCategory
      : ""
  );
  const router = useRouter();

  const [state, Action, pending] = useActionState(updateCategory, {
    err: null,
    success: false,
  });
  useEffect(() => {
    if (state.success) {
      toast.success("Category updated Successfully");

      // Update the categories state with the updated category
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === selectedIds
            ? {
                ...cat,
                name: newCategory,
                subCategory: newSubCategory.split(",").map((s) => s.trim()),
              }
            : cat
        )
      );
      console.log("isarray", Array.isArray(newSubCategory));

      setIsUpdatedModalOpen(false);
      setIsUpdated(true);
    }
  }, [state.success]);
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Product</h1>
        <span className="flex justify-end ">
          {" "}
          <Button
            className="p-2 rounded-full bg-red-600 hover:bg-red-600 text-white"
            onClick={() => setIsUpdatedModalOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </span>
        {/* {state.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.error}
        </div>
      )} */}

        <form action={Action} className="space-y-4">
          <input className="hidden" name="CategoryId" value={selectedIds} />
          <div className="">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={newCategory}
              placeholder="Enter category"
              onChange={(e) => setNewCategory(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="subCategory">SubCategory </Label>
            <Input
              id="subCategory"
              name="subCategory"
              value={newSubCategory}
              placeholder="Enter SubCategory"
              onChange={(e) => setNewSubCategory(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full">
            Update Category
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCategory;
