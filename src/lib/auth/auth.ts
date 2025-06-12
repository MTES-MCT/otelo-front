// import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
// import { AdapterAccount, AdapterUser } from 'next-auth/adapters'
import { authOptions } from '~/lib/auth/auth.config'

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  ...authOptions,
})
