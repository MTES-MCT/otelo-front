'use client'

import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { RatesProvider } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'
import { useBassinEpcis } from '~/hooks/use-bassin-epcis'

interface SimulationFormContextWrapperProps {
  children: React.ReactNode
  epcis?: string[]
}

export const SimulationFormRatesProviderContextWrapper = ({ children, epcis }: SimulationFormContextWrapperProps) => {
  const [queryEpcis] = useQueryState('epcis', parseAsArrayOf(parseAsString).withDefault([]))
  // In the case of a single epci, we need to get the bassin epci related to it and add it to the context
  const { data: bassinEpcis } = useBassinEpcis()
  const epcisCodes = epcis ?? (queryEpcis.length === 1 ? (bassinEpcis || []).map((epci) => epci.code) : queryEpcis)

  const { data: accommodationRates } = useAccommodationRatesByEpci(epcisCodes)
  if (!accommodationRates) return null

  return <RatesProvider initialRates={accommodationRates}>{children}</RatesProvider>
}
