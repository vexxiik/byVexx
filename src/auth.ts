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
        email: { label: "Email", type: "email", placeholder: "jakub@vexx.cz" },
        password: { label: "Heslo", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        // V produkci by hesla měla být v tabulce, tady simulujeme pokud je user vytvořen bez hesla v DB
        // Pro zjednodušení: pokud user existuje a heslo sedí (dummy ověření pro dev)
        // V reálu bychom měli heslo uložené na modelu Account nebo User a použili bcrypt.compare()
        if (user) {
          // Hardcodované super-admin heslo pro lokální testování, abychom nemuseli řešit registraci
          if (credentials.password === "admin123") {
            return user;
          }
        } else {
          // Pokud uživatel neexistuje, tak ho založíme, aby to fungovalo "out of the box" lokálně
          if (credentials.password === "admin123") {
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email as string,
                name: "Admin",
                credits: 100,
              }
            });
            return newUser;
          }
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
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
