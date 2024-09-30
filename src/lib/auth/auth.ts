import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { AdapterAccount, AdapterUser } from 'next-auth/adapters'

import authConfig from '~/lib/auth/auth.config'
import { prisma } from '~/lib/auth/prisma'

interface CustomAdapterUser extends AdapterUser {
  firstname: string
  lastname: string
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async (user: CustomAdapterUser) =>
      prisma.user.create({
        data: { ...user, emailVerified: new Date(), firstname: user.firstname, lastname: user.lastname },
      }),
    linkAccount: async (account: AdapterAccount) =>
      prisma.account.create({
        data: {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type,
          userId: account.userId,
        },
      }) as unknown as AdapterAccount,
  },
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
})
