import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, roles } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

export const NextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        userId: {
          type: "text",
        },
        password: {
          type: "text",
        },
        for: {
          type: "text",
        },
        name: {
          type: "text",
        },
        dob: {
          type: "date",
        },
        as: {
          type: "text",
        },
        age: {
          type: "number",
        },
        role: {
          type: "number",
        },
      },
      type: "credentials",
      authorize: async (credentials, req) => {
        if (!credentials?.userId || !credentials.password) return null;

        if (credentials?.for == "sign-in") {
          //if email or password is not present
          const user = (
            await prisma.user.findMany({
              where: {
                OR: [
                  {
                    email: credentials.userId,
                  },
                  {
                    phone_no: credentials.userId,
                  },
                ],
              },
            })
          )[0];

          //if user is not found in the database
          if (!user || !user.password) return null;

          //decrypt password
          const isValidPassword = await compare(
            credentials.password,
            user.password
          );

          //if is not valid password
          if (!isValidPassword) return null;

          return {
            id: user.id,
            email: user.email!,
            image: user.image!,
            name: user.name!,
            role: user.role_type!,
          };
        } else {
          const hashedPassword = await hash(credentials.password, 12);
          const user = await prisma.user.create({
            data: {
              email: credentials.userId,
              name: credentials.name,
              password: hashedPassword,
              role_type: credentials.role as roles,
              date_of_birth: credentials.dob,
              as: credentials.as,
              age: +credentials.age,
            },
          });

          return {
            id: user.id,
            email: user.email!,
            image: user.image!,
            name: user.name!,
            role: user.role_type!,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    // signOut: "/sign-out",
    // error: '/error', // Error code passed in query string as ?error=
    verifyRequest: "/verify-request", // (used for check email message)
    // newUser: "/user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        const user = await prisma.user.findUnique({ where: { id: token.uid } });
        if (user?.role_type) session.user.role = user.role_type;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        const userRes = await prisma.user.findUnique({
          where: { id: user.id },
        });
        if (userRes?.role_type) token.role = userRes.role_type;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
