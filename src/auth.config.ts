import { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export default {
  trustHost: true,
  providers: [
    google,
    github
  ]
} satisfies NextAuthConfig