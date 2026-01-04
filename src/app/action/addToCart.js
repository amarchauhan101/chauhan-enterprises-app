"use server";

import { dbConnect } from "@/lib/db";
import AddToCart from "@/models/addToCart";
import UserActivity from "@/models/UserActivity";
import userSchema from "@/models/userSchema";

export const addToCart = async (userId, product) => {
  try {
    await dbConnect();
    console.log("product in server", product);
    const user = await userSchema.findOne({ _id: userId });
    if (!user) {
      console.log("user is not find in add to cart");
    }
    let cart = await AddToCart.findOne({ userId: userId });
    if (!cart) {
      cart = await AddToCart.create({ userId: userId, items: [] });
    }
    console.log("cart", cart.items);
    const existingItem = await cart.items.find(
      (item) => item.productId.toString() === product.id.toString()
    );
    if (!existingItem) {
      cart.items.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    } else {
      existingItem.quantity += 1;
    }
    await cart.save();
    const dataAlreadyPresent = await UserActivity.findOne({
      userId,
      productId: product.id,
    });
    if(dataAlreadyPresent && dataAlreadyPresent.action=="viewed"){
        dataAlreadyPresent.action = "added_to_cart";
        await dataAlreadyPresent.save();
    }
    

    return {
      cart: JSON.parse(JSON.stringify(cart)),
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

export const RemoveFromCart = async (userId, product) => {
  try {
    await dbConnect();
    console.log("product in server", product);
    const user = await userSchema.findOne({ _id: userId });
    if (!user) {
      console.log("user is not find in add to cart");
    }
    let cart = await AddToCart.findOne({ userId: userId });
    if (!cart) {
      cart = await AddToCart.create({ userId: userId, items: [] });
    }
    console.log("cart", cart.items);
    const existingItem = await cart.items.find(
      (item) => item.productId.toString() === product.id.toString()
    );
    if (!existingItem) {
      console.log("cart not exist");
    }
    existingItem.quantity -= 1;

    if (existingItem.quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== product.id.toString()
      );
      await UserActivity.deleteMany({
        userId,
        productId: product.id,
        action: "added_to_cart",
      });
    }

    await cart.save();

    return {
      cart: JSON.parse(JSON.stringify(cart)),
      success: true,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getCart = async (userId) => {
  try {
    await dbConnect();
    const cart = await AddToCart.findOne({ userId: userId });
    if (!cart) {
      return {
        cart: null,
        success: false,
        message: "Cart not found",
      };
    }
    return {
      cart: JSON.parse(JSON.stringify(cart)),
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      cart: null,
      success: false,
      message: "Error fetching cart",
    };
  }
};
