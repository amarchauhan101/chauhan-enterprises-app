  "use client";
  import { addToCart, getCart } from "@/app/action/addToCart";
import { useCart } from "@/app/context/CartContext";
  import { ShoppingCart } from "lucide-react";
  import { useSession } from "next-auth/react";
  import React from "react";
  import toast from "react-hot-toast";

  function AddToCartButton({ product, cart, Cartquantity }) {
    console.log("cart quantity in Add to cart button ", Cartquantity);
    const {setCart } = useCart();
    const { data: session, status } = useSession();
    if (status === "loading") return <p>Loading...</p>;
    if (!session) {
      return (
        <button
          onClick={() => router.push("/login")}
          className="flex items-center justify-center gap-2 px-8 py-4 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#A0905C" }}
        >
          <ShoppingCart className="w-5 h-5" />
          Login to Add
        </button>
      );
    }
    const userId = session.user.id;
    console.log(userId);

    const handleAdd = async () => {
      const res = await addToCart(userId, product);
      console.log("res", res);
      if (res.success) {
        // handle success case
        toast.success("Item added to cart successfully!");
        setCart(res.cart);
      }
    };

    return (
      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          disabled={Cartquantity>0}
          className={`flex items-center justify-center gap-2 px-8 py-4  text-white font-medium rounded-xl hover:opacity-90 transition-opacity ${Cartquantity > 0 ? " cursor-not-allowed sm:flex sm:text-sm hidden bg-gray-700" : "bg-green-500 active:scale-90 "}`}
        >
          <ShoppingCart className="w-5 h-5" />
          {Cartquantity <= 0 ? "Add to Cart" : "Added"}
        </button>
      </div>
    );
  }

  export default AddToCartButton;
