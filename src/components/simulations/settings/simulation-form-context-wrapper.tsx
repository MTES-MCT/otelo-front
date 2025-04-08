'use client'

import { RatesProvider } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'

interface SimulationFormContextWrapperProps {
  children: React.ReactNode
  epci?: string
}

export const SimulationFormRatesProviderContextWrapper = ({ children, epci }: SimulationFormContextWrapperProps) => {
  const { data: accommodationRates } = useAccommodationRatesByEpci(epci)
  if (!accommodationRates) return null

  return <RatesProvider initialRates={accommodationRates}>{children}</RatesProvider>
}
