'use client'

import { startReactDsfr } from '@codegouvfr/react-dsfr/next-appdir'
import type { DefaultColorScheme } from '@codegouvfr/react-dsfr/next-appdir'
import Link from 'next/link'

declare module '@codegouvfr/react-dsfr/next-appdir' {
  interface RegisterLink {
    Link: typeof Link
  }
}

export const defaultColorScheme: DefaultColorScheme = 'system'

startReactDsfr({ Link, defaultColorScheme })

export function StartDsfr() {
  return null
}
