import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_AUTH_ID ?? '',
      clientSecret: process.env.GITHUB_AUTH_SECRET ?? '',
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_AUTH_ID ?? '',
      clientSecret: process.env.DISCORD_AUTH_SECRET ?? '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_AUTH_ID ?? '',
      clientSecret: process.env.FACEBOOK_AUTH_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_ID ?? '',
      clientSecret: process.env.GOOGLE_AUTH_SECRET ?? '',
    }),
  ],
  secret: process.env.AUTH_HASH_SECRET,
});
