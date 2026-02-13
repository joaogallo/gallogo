import { type DefaultSession } from "next-auth";
import { type AgeGroup } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      ageGroup: AgeGroup;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    ageGroup?: AgeGroup;
  }
}
