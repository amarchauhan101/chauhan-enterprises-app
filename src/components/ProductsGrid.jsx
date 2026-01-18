"use client";
import { fetchBasedOnActivity } from "@/app/action/fetchCategory";
import { Loader, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ProductsGrid({ filteredProducts, unique }) {
  const search = useParams();
  const slug = search.slug;
  console.log(slug);
  const router = useRouter();
  const searchParam = useSearchParams();
  const sub = searchParam.get("sub") || "all";
  console.log("sub", sub);
  const [isPending, startTransition] = React.useTransition();

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
    return (
      <p>
        <Loader />
      </p>
    );
  }
  if (user == "unauthenticated") {
    return <p>please login</p>;
  }
  console.log(user);
  console.log("recommendedProducts", recommendedProducts);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end items-center gap-2">
        <select
          name="sub"
          onChange={(e) => {
            startTransition(() => {
              router.push(`?sub=${e.target.value}`, { scroll: false });
            });
          }}
          value={sub}
          className="px-4 py-2 bg-amber-200 rounded-md focus:ring-amber-400 focus:ring-2 focus:outline-none"
        >
          <option value="all" className="rounded-md">
            All
          </option>
          {unique.map((subItem) => (
            <option
              className="font-semibold rounded-md"
              key={subItem}
              value={subItem}
            >
              {subItem}
            </option>
          ))}
        </select>
        {isPending && <Loader className="animate-spin" />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* First Row */}
        {recommendedProducts &&
          recommendedProducts.map((product) => {
            return (
              <Link key={product._id} href={`/category/${slug}/${product._id}`}>
                <div className="space-y-4 h-fit" key={product.id}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      height={500}
                      width={500}
                      className="w-full h-72 object-cover lg:object-contain bg-gray-50"
                    />
                    <div className="p-4 ">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-[#191c1e] text-lg">
                          {product.title}
                        </h3>
                        <span className="font-semibold text-[#191c1e] text-lg">
                          {product.price}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {product.category}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        {!isPending ? (
          filteredProducts.map((product) => {
            return (
              <Link key={product.id} href={`/category/${slug}/${product.id}`}>
                <div className="space-y-4" key={product.id}>
                  <div className="bg-white shadow-2xl rounded-md overflow-hidden border-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      height={500}
                      width={500}
                      className="w-full h-64 object-cover lg:object-contain  bg-gray-50"
                    />
                    <div className="p-4  ">
                      <div className="mb-4">
                        <div className="flex justify-between items-start ">
                        <h3 className="font-semibold text-[#191c1e] text-lg">
                          {product.title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                        {product.category}
                      </p>
                      </div>
                      <span className="font-semibold text-[#191c1e] text-lg">
                          {product.price}
                        </span>
                      </div>
                      <button className="w-full bg-black active:scale-95 text-white py-2 rounded-md cursor-pointer">Details</button>
                      
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full flex justify-center items-center min-h-64"><Loader2  className="animate-spin text-6xl" size={48}/></div>
        )}
      </div>
    </div>
  );
}

export default ProductsGrid;
