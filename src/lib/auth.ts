import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    MicrosoftEntraId({
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      issuer: process.env.MICROSOFT_ISSUER,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user?.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          ageGroup: user.ageGroup,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // For OAuth logins, load ageGroup from DB
        if (account?.provider !== "credentials" && token.sub) {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: { ageGroup: true },
          });
          token.ageGroup = dbUser?.ageGroup ?? "AGE_8_12";
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          token.ageGroup = (user as any).ageGroup;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).ageGroup = token.ageGroup;
      }
      return session;
    },
  },
});
