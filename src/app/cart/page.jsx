
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <CartPage cart={cart} userId={userId} />
      {/* Checkout button will be integrated within CartPage component */}
      {cart && cart.items.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2"></div>
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl p-6 shadow-xl border border-amber-200 backdrop-blur-sm">
                <div className="mb-4">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent mb-2">Complete Your Order</h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-full"></div>
                </div>
                <CheckOutButton userId={userId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
