import NextAuth, { NextAuthOptions } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";


export const authOptions: NextAuthOptions = {

  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },pages: {
    signIn: '/auth/signin',
  },
  events: {
    async signOut({ token, session }) {
      // Delete auth cookie on signout so it doesn't persist past log out
      res.setHeader("Set-Cookie", "");
  
      // Set token/session to {}, that would update the cilentside token/session as well
      token = {};
      session = {};
  }
}

export default NextAuth(authOptions)
