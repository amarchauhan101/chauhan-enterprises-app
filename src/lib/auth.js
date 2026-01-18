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
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Add error handling
  events: {
    async signIn(message) {
      console.log('SignIn event:', message)
    },
    async signOut(message) {
      console.log('SignOut event:', message)
    },
    async session(message) {
      console.log('Session event:', message)
    }
  },
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
    async session({ session, token }) {
      try {
        if (!session?.user?.email) {
          console.warn("Session or user email not found");
          return session;
        }

        await dbConnect();
        const existingUser = await userSchema.findOne({
          email: session.user.email,
        });

        if (existingUser) {
          session.user.id = existingUser._id.toString();
          session.user.email = existingUser.email;
          session.user.role = existingUser.role;
          session.user.username = existingUser.username;
          session.user.profileImage = existingUser.profileImage;
        } else {
          console.warn(`User not found in database: ${session.user.email}`);
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        // Return session even if database lookup fails
        return session;
      }
    },
    async jwt({ token, user }) {
      try {
        // If user is provided, it means it's a sign in
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.role = user.role;
          token.username = user.username;
        }

        // If we don't have role info and have an email, fetch from database
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
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
  },
});
