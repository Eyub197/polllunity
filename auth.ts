import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './lib/prisma';
 

const getUser = async (email : string) => {
  try{
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
     })
     console.log(user)
     return user
  } catch (error) {
    console.error("failed to fetch user", error)
    throw new Error("failed to fetch user")
  }
}

export const  { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email()})
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email } = parsedCredentials.data;
          const user = await getUser(email);
          console.log(email)
          if (!user) return null
          else return user
        }
        return null;
      },
    }),
  ],
});