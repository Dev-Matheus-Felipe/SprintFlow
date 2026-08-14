import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { prisma } from "./prisma"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, GitHub],

    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60,
    },

    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;
            session.user.role = user.role;

            return session;
        },
    },

})