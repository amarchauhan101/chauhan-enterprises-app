
import CartPage from "@/components/CartPage";
import React from "react";
import { getCart } from "../action/addToCart";
import { auth } from "@/lib/auth";
import { getorder } from "../action/getOrder";
import CheckOutButton from "@/components/CheckOutButton";

async function Cart() {
  const user = await auth();
  console.log("user in auth", user.user.id);
  const cart = await getorder(user.user.id);
  const userId = user.user.id;
  console.log("cart in cart", cart);
  
  return (
    <div>
      <CartPage cart={cart} userId={userId} />
      <div className="flex items-center justify-end px-6 ">
        <CheckOutButton userId={userId} />
      </div>
    </div>
  );
}

export default Cart;
