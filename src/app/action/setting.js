"use server";

import { dbConnect } from "@/lib/db";
import User from "@/models/userSchema";

export const changeUserName = async (userId, newUserName) => {
  try {
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return Response.json({
        success: false,
        message: "could not find userId",
      });
    }
    // const userName = user.name;
    const UpdateUserName = await User.findByIdAndUpdate(
      userId,
      {
        username: newUserName,
      },
      { new: true }
    );
    return { success: true, data: JSON.parse(JSON.stringify(UpdateUserName)) };
  } catch (err) {
    console.log("err in changeUserName: ", err);
  }
};

export const changeUserEmail = async (userId, newEmail) => {
  try {
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "could not find userId" };
    }
    // const userName = user.name;
    const UpdateUserEmail = await User.findByIdAndUpdate(
      userId,
      {
        email: newEmail,
      },
      { new: true }
    );
    return { success: true, data: JSON.parse(JSON.stringify(UpdateUserEmail)) };
  } catch (err) {
    console.log("err in changeUseremail: ", err);
  }
};
