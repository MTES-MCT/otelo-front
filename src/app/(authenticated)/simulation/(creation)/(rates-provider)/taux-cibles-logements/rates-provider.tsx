import React, { createContext, useContext, useState } from 'react'
import { TAccommodationRates } from '~/schemas/accommodations-rates'

export interface RateSettings {
  txLV: number
  txLVLD: number
  txRS: number
}

interface RatesState {
  rates: Record<string, RateSettings>
  updateRates: (epciId: string, newRates: Partial<RateSettings>) => void
}

export const RatesSettingsContext = createContext<RatesState | undefined>(undefined)

interface RatesProviderProps {
  children: React.ReactNode
  initialRates: Record<string, TAccommodationRates>
}

export const getComputedTxLv = (value: number, tauxLVLD: number): number => value - ((tauxLVLD && tauxLVLD / 100) || 0)

export const RatesProvider = ({ children, initialRates }: RatesProviderProps) => {
  const transformedInitialRates: Record<string, RateSettings> = Object.entries(initialRates).reduce(
    (acc, [epciId, rates]) => ({
      ...acc,
      [epciId]: {
        txLV: getComputedTxLv(rates.txLv, rates.vacancy.txLvLongue),
        txLVLD: rates.vacancy.txLvLongue,
        txRS: rates.txRs,
      },
    }),
    {},
  )

  const [rates, setRates] = useState<Record<string, RateSettings>>(transformedInitialRates)
  const updateRates = (epciId: string, newRates: Partial<RateSettings>) => {
    setRates((prevRates) => ({
      ...prevRates,
      [epciId]: {
        ...prevRates[epciId],
        ...newRates,
      },
    }))
  }

  return <RatesSettingsContext.Provider value={{ rates, updateRates }}>{children}</RatesSettingsContext.Provider>
}

export const useBassinRates = () => {
  const context = useContext(RatesSettingsContext)
  if (context === undefined) {
    throw new Error('useBassinRates must be used within a RatesProvider')
  }
  return context
}
