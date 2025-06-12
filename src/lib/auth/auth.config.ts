import type { AuthOptions, NextAuthOptions, Session, User } from 'next-auth'
import { ProConnectProvider, proConnectProviderId } from '~/lib/auth/providers/pro-connect'

type CustomUser = User & {
  firstName: string
  lastName: string
  sub: string
  id: string
  email: string
  provider: string
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        // First time coming from SSO
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
        } catch (_error) {
          throw new Error('Failed to get tokens from API')
        }
      } else if (Date.now() < (token.expiresAt as number) * 1000) {
        // Subsequent logins, but the `access_token` is still valid
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
