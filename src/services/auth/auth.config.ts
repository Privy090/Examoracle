import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth"
  },
  callbacks: {
    authorized({ auth }) {
      return Boolean(auth?.user);
    }
  },
  providers: []
} satisfies NextAuthConfig;
