"use client";
import { fetchBasedOnActivity } from "@/app/action/fetchCategory";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function ProductsGrid({ filteredProducts }) {
  const search = useParams();
  const slug = search.slug;
  console.log(slug);

  const { data: user, status } = useSession();
  const userId = user?.user?.id;
  const [recommendedProducts, setRecommendedProducts] = React.useState([]);
  useEffect(() => {
    if (status == "authenticated") {
      fetchBasedOnActivity(userId).then((response) => {
        if (response.success) {
          setRecommendedProducts(response.RecommendedProduct);
        }
      });
    }
  }, [status, userId]);

  if (status == "loading") {
    return <p>Loading...</p>;
  }
  if (user == "unauthenticated") {
    return <p>please login</p>;
  }
  console.log(user);
  console.log("recommendedProducts",recommendedProducts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {/* First Row */}
      {recommendedProducts &&
        recommendedProducts.map((product) => {
          return (
            <Link key={product._id} href={`/category/${slug}/${product._id}`}>
              <div className="space-y-4" key={product.id}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    height={500}
                    width={500}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-[#191c1e] text-lg">
                        {product.title}
                      </h3>
                      <span className="font-semibold text-[#191c1e] text-lg">
                        {product.price}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      {filteredProducts.map((product) => {
        return (
          <Link key={product.id} href={`/category/${slug}/${product.id}`}>
            <div className="space-y-4" key={product.id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  height={500}
                  width={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-[#191c1e] text-lg">
                      {product.title}
                    </h3>
                    <span className="font-semibold text-[#191c1e] text-lg">
                      {product.price}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsGrid;
