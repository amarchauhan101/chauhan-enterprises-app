"use client";
import { addToCart, getCart, RemoveFromCart } from "@/app/action/addToCart";
import React, { useEffect } from "react";
import AddToCartButton from "./AddToCartButton";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
// import {useCart} from '@app/context/CartContext';
function QuantityAndAction({ userId, product }) {
  const Router = useRouter();
  console.log("product", product);
  // const [cart, setCarts] = React.useState(null);

  const { cart, setCart } = useCart();
  // const {setCart} = useCart();
  console.log("setCart", setCart);
  // const getcart = async () => {
  //   const res = await getCart(userId);
  //   setCart(res.cart);
  // };
  // useEffect(() => {
  //   getcart();
  // }, []);

  const handleMinus = async () => {
    const res = await RemoveFromCart(userId, product);
    setCart(res.cart);
    // getcart();
    // Router.refresh();
  };
  const handlePlus = async () => {
    const res = await addToCart(userId, product);
    setCart(res.cart);
    // getcart();
    // Router.refresh();
  };

  let IsInCart;
  let Cartquantity;
  console.log("cart in action", cart);
  if (cart) {
    IsInCart =
      cart.items &&
      cart.items.some(
        (item) => item.productId.toString() === product.id.toString(),
      );
    Cartquantity = IsInCart
      ? cart.items.find(
          (item) => item.productId.toString() === product.id.toString(),
        ).quantity
      : 0;
  }
  console.log("is IN cart", IsInCart);
  console.log("cartquantity in quantity Action", Cartquantity);
  return (
    <div className="flex items-center gap-6">
      <AddToCartButton
        product={product}
        cart={cart}
        Cartquantity={Cartquantity}
      />
      <div className="flex items-center justify-end">
        <button
          onClick={handleMinus}
          disabled={!IsInCart}
          className="w-10 h-10 sm:border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-4 sm:w-16 text-center text-lg">{Cartquantity}</span>
        <button
          disabled={!IsInCart}
          onClick={handlePlus}
          className="w-10 h-10 sm:border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
        >
          +
        </button>
      </div>

      {/* <div className="flex flex-col gap-2">
     
       
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 mx-auto  gap-4">
        
      </div> */}
    </div>
  );
}

export default QuantityAndAction;
