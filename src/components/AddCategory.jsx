'use client'
import React, { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
// import { Label } from "@radix-ui/react-label";
import { subCategories } from "@/models/subCategories";
import { addCategory } from "@/app/action/fetchCategory";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function AddCategory({ setIsModalOpen ,categories,setCategories}) {
  const router = useRouter();
    const [state,Action,pending] = useActionState(addCategory,{
        err:null,
        success:false
    })
  // console.log("setAction",setAction,"Action",Action);
  useEffect(()=>{
    console.log("state inside the useeffect",state);
    if(state.success){
      toast.success("Category Added Successfully");
      setCategories((prev) => [...prev, state.data]);
      setIsModalOpen(false)
    }
  },[state.success])
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Product</h1>
        <span className="flex justify-end ">
          {" "}
          <Button
            className="p-2 rounded-full bg-red-600 hover:bg-red-600 text-white"
            onClick={() => setIsModalOpen(false)}
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
          <div className="">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="Enter category"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="subCategory">SubCategory </Label>
            <Input
              id="subCategory"
              name="subCategory"
              placeholder="Enter SubCategory"
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full">
            Add Category
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
