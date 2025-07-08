import React, { createContext, useContext, useState } from 'react'
import { TAccommodationRates } from '~/schemas/accommodations-rates'

export interface RateSettings {
  vacancyRate: number
  longTermVacancyRate: number
  shortTermVacancyRate: number
  txRS: number
}

interface RatesState {
  rates: Record<string, RateSettings>
  defaultRates: Record<string, RateSettings>
  updateRates: (epciId: string, newRates: Partial<RateSettings>) => void
}

export const RatesSettingsContext = createContext<RatesState | undefined>(undefined)

interface RatesProviderProps {
  children: React.ReactNode
  initialRates: Record<string, TAccommodationRates>
}

export const RatesProvider = ({ children, initialRates }: RatesProviderProps) => {
  const transformedInitialRates: Record<string, RateSettings> = Object.entries(initialRates).reduce((acc, [epciId, rates]) => {
    return {
      ...acc,
      [epciId]: {
        vacancyRate: rates.vacancyRate,
        longTermVacancyRate: rates.longTermVacancyRate,
        shortTermVacancyRate: rates.shortTermVacancyRate,
        txRS: rates.txRs,
        initialRates: rates,
      },
    }
  }, {})

  const [rates, setRates] = useState<Record<string, RateSettings>>(transformedInitialRates)
  const [defaultRates] = useState<Record<string, RateSettings>>(transformedInitialRates)
  const updateRates = (epciId: string, newRates: Partial<RateSettings>) => {
    setRates((prevRates) => ({
      ...prevRates,
      [epciId]: {
        ...prevRates[epciId],
        ...newRates,
      },
    }))
  }

  return <RatesSettingsContext.Provider value={{ rates, updateRates, defaultRates }}>{children}</RatesSettingsContext.Provider>
}

export const useEpcisRates = () => {
  const context = useContext(RatesSettingsContext)
  if (context === undefined) {
    throw new Error('useEpcisRates must be used within a RatesProvider')
  }
  return context
}
