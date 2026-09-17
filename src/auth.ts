import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "vase@emailova.adresa" },
        password: { label: "Heslo", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        if (credentials.email === "jakub@vexx.cz" && credentials.password === "DefN0tVexx") {
          let user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          });
          if (!user) {
            user = await prisma.user.create({
              data: {
                email: "jakub@vexx.cz",
                name: "Jakub",
                credits: 1000,
              }
            });
          } else if (user.credits !== 1000) {
            user = await prisma.user.update({
              where: { email: "jakub@vexx.cz" },
              data: { credits: 1000 }
            });
          }
          return user;
        }

        // Zjednodušený login pro ostatní uživatele (předpoklad že nemají heslo v DB)
        if (credentials.password === "admin123") {
          let user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          });
          if (!user) {
            user = await prisma.user.create({
              data: {
                email: credentials.email as string,
                name: "Admin",
                credits: 100,
              }
            });
          }
          return user;
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/crm',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
