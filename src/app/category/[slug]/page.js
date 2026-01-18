import { Categoryfetch } from "@/app/action/fetchCategory";
import FilterForm from "@/components/FilterForm";
import ProductsGrid from "@/components/ProductsGrid";
// import { subCategories } from "@/models/subCategories";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { auth } from "../../../lib/auth";
export default async function Category({ params, searchParams }) {
  const { slug } = await params;
  const decode = decodeURIComponent(slug);
  // console.log("decode",decode.toCapitalize());

  const res = await Categoryfetch(decode);
  console.log("res in category page ", res);

  // Convert MongoDB documents to plain objects
  const products = res.map((item) => ({
    id: item._id.toString(),
    title: item.title,
    category: item.category,
    subCategory: item?.subCategory,
    price: item.price,
    image: item.image[0],
    createdAt: item.createdAt,
  }));
  console.log("products", products);
  const uniqueSub = [...new Set(products.map((item) => item?.subCategory))];
  const search = await searchParams;
  const selectedSub = search?.sub || "all";
  console.log("selectedSub", selectedSub);
  const filteredProducts =
    selectedSub === "all"
      ? products
      : products.filter((p) => p.subCategory === selectedSub);

  return (
    <div className="bg-white py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-gray-900 mb-4">
            Discover pieces that feel like home &{" "}
            <span className="text-orange-500">Make every space </span> feel
            personal
          </h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
            Your home is more than just a place — it’s a reflection of you. Our
            curated collections are designed to help you create spaces filled
            with comfort, warmth, and personality, no matter the room or style.
          </p>
        </div>

        {/* Properties Grid */}
        <ProductsGrid filteredProducts={filteredProducts} unique={uniqueSub} />
        {/* View All Button */}
      </div>
    </div>
  );
}
