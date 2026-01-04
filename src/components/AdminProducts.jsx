"use client";
import React, { useState } from "react";
import ProductsHeaders from "./ProductsHeaders";
import ProductShowTable from "./ProductShowTable";
import { BulkAction } from "@/app/action/updateProduct";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function AdminProducts({ products }) {
  const [selectId, setSelectId] = useState([]);
  const [click, setclick] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [filter,setFilter] = useState({
    search:"",
    category:"All",
    priceFilter:"All"
  });



  const bulkAction = async () => {
    if (selectId.length === 0) {
      toast.error("No products selected for bulk action");
      return;
    }
    try {
      await BulkAction([...selectId]);
      setSelectId([]); // Clear selection after action
      toast.success(`${selectId.length} products deleted successfully`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete products");
    }
  };


  return (
    <div className="w-full">
      <ProductsHeaders
        products={products}
        bulkAction={bulkAction}
        selectId={selectId}
        click={click}
        setclick={setclick}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        filter={filter}
        setFilter={setFilter}

      />
      <ProductShowTable
        products={products}
        selectId={selectId}
        setSelectId={setSelectId}
        click={click}
        setclick={setclick}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        filter={filter}
        setFilter={setFilter}
        
      />
    </div>
  );
}

export default AdminProducts;
