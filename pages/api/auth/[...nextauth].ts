import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth, { Account, Awaitable,   Session,   User } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider  from 'next-auth/providers/facebook'
import CredentialProvider from 'next-auth/providers/credentials'
import clientPromise from "../config/mongodb"
import Credentials from "next-auth/providers/credentials"
import Users, { UserType } from "../models/users"
import { Types } from "mongoose"
import dbConnect from "../config/dbConfig"
export interface ExtendedSession extends Session{
  id:string
  sessionToken: string
  userId: Types.ObjectId
}
export interface ReturnVales {
  session?:Session
  token?:string
  account?:Account
}
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!
      }),
      FacebookProvider({
        clientId: process.env.APP_ID!,
        clientSecret: process.env.APP_SECRET!
      }),
      CredentialProvider({
        name: "credentials",
        credentials: {
          email : {
            label: "Email",
            type: "email",
            placeholder: "Enter your Email"
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Enter your Email"
          }
        },
        async authorize (credentials, req) : Promise<User | null>{

          const email=credentials?.email
          const password=credentials?.password
          try { 
            // connect to database
            await dbConnect()
            // check if email is registerd
            const registeredUser= await Users.findOne({email}) as UserType
            const isRightPassword= registeredUser.isPasswordMatch(password!) 
            if (registeredUser && isRightPassword){
     
       return registeredUser
            } else {
        
              throw new Error("Invalid Credentials")
            }
          } catch (error) {
            throw new Error("Invalid Credentials")
           
          }
        }
      })
    // ...add more providers here
  ],
 
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
signIn: "/auth"
  },

  callbacks: {
     // @ts-ignore
    async jwt({ token, user }) {
     return { ...token, ...user }
    },
     // @ts-ignore
     async session({ session, user, token }) {
     return token
    },
   },

}
 // @ts-ignore
export default NextAuth(authOptions)