'use client'

import { RatesProvider } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'

interface SimulationFormContextWrapperProps {
  children: React.ReactNode
}

export const SimulationFormContextWrapper = ({ children }: SimulationFormContextWrapperProps) => {
  const { data: accommodationRates } = useAccommodationRatesByEpci()
  if (!accommodationRates) return null

  return <RatesProvider initialRates={accommodationRates}>{children}</RatesProvider>
}
