import type { AuthOptions, NextAuthOptions, Session, User } from 'next-auth'
import { ProConnectProvider, proConnectProviderId } from '~/lib/auth/providers/pro-connect'

export type CustomUser = User & {
  firstName: string
  lastName: string
  sub: string
  hasAccess: boolean
  id: string
  email: string
  provider: string
  role: 'ADMIN' | 'USER'
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn(params) {
      try {
        // We sign up user there
        const user = params.user as CustomUser
        await fetch(`${process.env.NEXT_OTELO_API_URL}/auth/callback`, {
          body: JSON.stringify({
            email: user.email,
            provider: proConnectProviderId,
            firstname: user.firstName,
            lastname: user.lastName,
            sub: user.sub,
            id: user.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        // Ensuite, vérifier l'accès
        const hasUserAccess = await fetch(`${process.env.NEXT_OTELO_API_URL}/auth/access`, {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!hasUserAccess.ok) {
          throw new Error('Failed to check user access')
        }

        const data = await hasUserAccess.json()
        if (data) {
          return true
        }
        return '/unauthorized'
      } catch {
        return '/unauthorized'
      }
    },
    async jwt({ account, token, user }) {
      if (account) {
        // User is already registered in the signIn callback
        // Get session tokens
        try {
          const response = await fetch(`${process.env.NEXT_OTELO_API_URL}/auth/callback`, {
            body: JSON.stringify({
              email: user.email,
              provider: proConnectProviderId,
              firstname: (user as CustomUser).firstName,
              lastname: (user as CustomUser).lastName,
              sub: (user as CustomUser).sub,
              id: (user as CustomUser).id,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })
          if (!response.ok) {
            throw new Error('Failed to get tokens from API')
          }
          const data = await response.json()
          const expiresAtUnix = Math.floor(new Date(data.session.expiresAt).getTime() / 1000)
          token.accessToken = data.session.accessToken
          token.refreshToken = data.session.refreshToken
          token.expiresAt = expiresAtUnix
          token.user = data.user

          // User has passed the access check in signIn
          token.hasAccess = true
        } catch (_error) {
          throw new Error('Failed to get tokens from API')
        }
      } else if (Date.now() < (token.expiresAt as number) * 1000) {
        // Subsequent logins, but the `access_token` is still valid
        const hasUserAccess = await fetch(`${process.env.NEXT_OTELO_API_URL}/auth/access`, {
          method: 'POST',
          body: JSON.stringify({
            email: (token.user as CustomUser)?.email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!hasUserAccess.ok) {
          token.error = 'AccessCheckError'
          throw new Error('Failed to check user access')
        }

        const accessData = await hasUserAccess.json()
        if (!accessData) {
          token.error = 'AccessRevoked'
          throw new Error('User access has been revoked')
        }
        return token
      } else {
        if (!token.refreshToken) throw new TypeError('Missing refresh_token')
        try {
          const response = await fetch(`${process.env.NEXT_OTELO_API_URL}/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })
          if (!response.ok) {
            token.error = 'RefreshTokenError'
            throw new Error('Failed to refresh token')
          }

          const data = await response.json()

          // Check if user still has access after refresh
          const hasUserAccess = await fetch(`${process.env.NEXT_OTELO_API_URL}/auth/access`, {
            method: 'POST',
            body: JSON.stringify({
              email: (token.user as CustomUser)?.email,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!hasUserAccess.ok) {
            token.error = 'AccessCheckError'
            throw new Error('Failed to check user access')
          }

          const accessData = await hasUserAccess.json()
          if (!accessData) {
            token.error = 'AccessRevoked'
            throw new Error('User access has been revoked')
          }

          const expiresAtUnix = Math.floor(new Date(data.session.expiresAt).getTime() / 1000)
          token.accessToken = data.session.accessToken
          token.refreshToken = data.session.refreshToken
          token.expiresAt = expiresAtUnix
        } catch (error) {
          console.error('Error refreshing token:', error)
          token.error = 'RefreshTokenError'
          return token
        }
      }
      return token
    },
    async session({ session, token }) {
      ;(session as Session).accessToken = token.accessToken as string
      ;(session as Session).user = token.user as CustomUser
      ;(session as Session).error = (token.error as string) ?? null

      return session
    },
  },
  providers: [ProConnectProvider()],
} satisfies AuthOptions
