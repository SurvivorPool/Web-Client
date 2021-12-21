import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_AUTH_ID,
            clientSecret: process.env.GITHUB_AUTH_SECRET
        })
    ],
    secret: process.env.AUTH_HASH_SECRET
});
