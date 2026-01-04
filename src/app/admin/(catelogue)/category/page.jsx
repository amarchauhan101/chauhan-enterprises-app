import { fetchAllProducts } from "@/app/action/fetchCategory";
import AdminCategory from "@/components/AdminCategory";
import { auth } from "@/lib/auth";
import React from "react";

async function Category() {
  const user = await auth();
  const userId = user.user.id;
  const products = await fetchAllProducts(userId);
  return (
    <div className="w-full">
      <AdminCategory products={products} />
    </div>
  );
}

export default Category;
