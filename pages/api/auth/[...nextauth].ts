import NextAuth, { NextAuthOptions,  User as UserN } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export interface UserModel {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    image: string,
  }
export const authOptions: NextAuthOptions = {
    
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userData: any = {
          id: req?.body?._id,
          name: req?.body?.name,
          email: req?.body?.email,
          jwt: req?.body?.jwt,
        };
      

        if (userData) {
          return { ...userData };
        } else {
          return null;
        }
      
      },
    },
    ),
  
  ],

  session: {
    maxAge: 30 * 24 * 60 * 60,

  },
  
  callbacks: {
    async jwt({ token, account, profile, user }) {
      const newAccount: any = user;
      if (account) {
        token.id = newAccount._id;
        token.jwt = newAccount.jwt;
        token.user = user;
      }

      return token;
    },
    async session({ session, token, }) {
      session = { ...session, user: token.user as UserModel & UserN };
      return { ...session }; 
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/signup", 
  },

  secret: process.env.NEXTAUTH_SECRET,

};

export default NextAuth(authOptions);