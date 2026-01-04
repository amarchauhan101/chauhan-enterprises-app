import { Categoryfetch, fetchSingleDetail } from "@/app/action/fetchCategory";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { auth } from "../../../../lib/auth";
import QuantityAndAction from "@/components/QuantityAndAction";
import { getorder } from "@/app/action/getOrder";

export default async function Details({ params }) {
  const { id } = await params;
  const user = await auth();
  console.log(user.user.id);
  const userId = user.user.id;
  console.log("user using auth", user);
  console.log(id);
  const data = await fetchSingleDetail(id, userId);
  console.log(data);
  const cartItem = await getorder(userId);
  

  // Convert MongoDB document to plain object
  const product = {
    id: data._id.toString(),
    title: data.title,
    category: data.category,
    price: data.price,
    image: data.image,
    stock: data?.stock,
    createdAt: data.createdAt,
  };
  console.log(product);
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between ">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {product.category}
          </Link>
          <Link className="flex gap-2 relative" href="/cart" >
            <span>
              <ShoppingCart className="relative" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItem.items.length}
              </span>
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Image Gallery Placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <span className="text-gray-400 text-sm">View {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-3 py-1 text-sm font-medium rounded-full"
                  style={{ backgroundColor: "#A0905C", color: "white" }}
                >
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    (4.8) • 124 reviews
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-light text-gray-900 capitalize mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4">
                <span
                  className="text-4xl font-light"
                  style={{ color: "#A0905C" }}
                >
                  ${product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${Math.round(product.price * 1.25)}
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                  20% OFF
                </span>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience ultimate comfort with our premium{" "}
                {product.title.toLowerCase()}. Crafted with high-quality
                materials and designed for modern living spaces. This{" "}
                {product.category.toLowerCase()} combines style, durability, and
                comfort to transform your home into a sanctuary of relaxation.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5" style={{ color: "#A0905C" }} />
                <div>
                  <div className="font-medium text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-600">
                    On orders over $200
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" style={{ color: "#A0905C" }} />
                <div>
                  <div className="font-medium text-gray-900">
                    2 Year Warranty
                  </div>
                  <div className="text-sm text-gray-600">Full coverage</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5" style={{ color: "#A0905C" }} />
                <div>
                  <div className="font-medium text-gray-900">
                    30-Day Returns
                  </div>
                  <div className="text-sm text-gray-600">Hassle-free</div>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-6">
              <QuantityAndAction userId={userId} product={product} />

              {/* Action Buttons */}

              {/* Secondary Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  Save to Wishlist
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <span className="ml-2 text-gray-900">
                    {product.id.slice(-6).toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="ml-2 text-gray-900">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">Availability:</span>
                  <span className="ml-2 text-green-600">
                    {product?.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Added:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
