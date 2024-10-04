import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Return user object if credentials are valid
          return { id: user.id, fullname: user.fullname, email: user.email };
        }
        // Return null if authentication fails
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullname = user.fullname; // Save fullname in token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Add user id to session
      session.user.fullname = token.fullname; // Add fullname to session
      return session;
    },
  },
  pages: {
    signIn: "/signin", // Redirect users to this route for login
  },
});
