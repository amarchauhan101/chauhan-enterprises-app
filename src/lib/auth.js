import { dbConnect } from "@/lib/db";
import userSchema from "@/models/userSchema";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await dbConnect();
        const existUser = await userSchema.findOne({ email: user.email });
        if (!existUser) {
          // Check if username already exists and create unique username if needed
          let username = user.name;
          let usernameExists = await userSchema.findOne({ username: username });
          let counter = 1;
          
          // If username exists, append number to make it unique
          while (usernameExists) {
            username = `${user.name}${counter}`;
            usernameExists = await userSchema.findOne({ username: username });
            counter++;
          }

          const newUser = await userSchema.create({
            username: username,
            email: user.email,
            role: "user",
            profileImage: user.image,
          });
        }
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        await dbConnect();
        const existingUser = await userSchema.findOne({
          email: session.user.email,
        });

        if (existingUser) {
          session.user.id = existingUser._id;
          session.user.email = existingUser.email;
          session.user.role = existingUser.role;
          session.user.username = existingUser.username;
          session.user.profileImage = existingUser.profileImage;
        }

        return session;
      } catch (error) {
        console.error("Session error:", error);
        return session;
      }
    },
  },
});
