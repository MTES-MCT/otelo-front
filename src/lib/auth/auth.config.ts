import type { NextAuthConfig, Session, User } from 'next-auth'

type CustomUser = User & { role: 'USER' | 'ADMIN' }

export default {
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        // First time coming from SSO
        try {
          const response = await fetch(`${process.env.NEXT_OTELO_API_URL}/auth/callback`, {
            body: JSON.stringify({
              email: user.email,
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
        } catch (error) {
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
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async session({ session, token }) {
      ;(session as Session).accessToken = token.accessToken as string
      ;(session as Session).user = token.user as CustomUser
      ;(session as Session).error = (token.error as string) ?? null

      return session
    },
  },
  providers: [
    {
      authorization: { params: { scope: 'openid email profile' } },
      checks: ['none'],
      clientId: process.env.NEXT_PRIVATE_OAUTH_CEREMA_CLIENT_ID,
      clientSecret: process.env.NEXT_PRIVATE_OAUTH_CEREMA_CLIENT_SECRET,
      id: 'cerema-oidc',
      issuer: process.env.CEREMA_OIDC_ISSUER,
      name: 'Cerema OIDC',
      async profile(profile) {
        return {
          email: profile.email,
          firstname: profile.given_name,
          id: profile.sub,
          lastname: profile.family_name,
          role: 'USER',
          sub: profile.sub,
        }
      },
      type: 'oidc',
      wellKnown: `${process.env.CEREMA_OIDC_ISSUER}/.well-known/openid-configuration`,
    },
  ],
} satisfies NextAuthConfig
