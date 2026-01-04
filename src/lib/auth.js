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
      await dbConnect();
      const existUser = await userSchema.findOne({ email: user.email });
      if (!existUser) {
        const newUser = await userSchema.create({
          username: user.name,
          email: user.email,
          role: "user",
          profileImage: user.image,
        });
      }
      return true;
    },
    async session({ session }) {
      await dbConnect();
      const existingUser = await userSchema.findOne({
        email: session.user.email,
      });

      session.user.id = existingUser._id;
      (session.user.email = existingUser.email),
        (session.user.role = existingUser.role),
        (session.user.username = existingUser.username),
        (session.user.profileImage = existingUser.profileImage);

      return session;
    },
  },
});
