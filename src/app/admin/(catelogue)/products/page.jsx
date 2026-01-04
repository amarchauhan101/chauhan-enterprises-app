import { fetchAllProducts } from "@/app/action/fetchCategory";
import AdminProducts from "@/components/AdminProducts";
import { auth } from "@/lib/auth";
import React from "react";

async function Products() {
  const user = await auth();
  const userId = user.user.id;

  const products = await fetchAllProducts(userId);
  // console.log(products);
  return (
    <div className="w-full">
      <AdminProducts products={products} />
    </div>
  );
}

export default Products;
