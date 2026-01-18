import { dbConnect } from "@/lib/db";
import userSchema from "@/models/userSchema";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  trustHost: true, // Important for production deployment
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback called:", {
        user: user?.email,
        account: account?.provider,
      });
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
          console.log("New user created:", newUser.email);
        } else {
          console.log("Existing user found:", existUser.email);
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
    async jwt({ token }) {
      try {
        if (!token.role && token.email) {
          await dbConnect();

          const dbUser = await userSchema.findOne({ email: token.email });

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role;
            token.username = dbUser.username;
          }
        }

        return token;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
