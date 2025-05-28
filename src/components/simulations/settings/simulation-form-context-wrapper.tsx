'use client'

import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { RatesProvider } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'
import { useBassinEpcis } from '~/hooks/use-bassin-epcis'

interface SimulationFormContextWrapperProps {
  children: React.ReactNode
  epcis?: string[]
}

export const SimulationFormRatesProviderContextWrapper = ({ children, epcis }: SimulationFormContextWrapperProps) => {
  const [queryStates] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    type: parseAsString,
  })
  const { data: bassinEpcis } = useBassinEpcis()
  const epcisCodes = epcis ?? (queryStates.type === 'epcis' ? queryStates.epcis : (bassinEpcis || []).map((epci) => epci.code))

  const { data: accommodationRates } = useAccommodationRatesByEpci(epcisCodes)
  if (!accommodationRates) return null

  return <RatesProvider initialRates={accommodationRates}>{children}</RatesProvider>
}
