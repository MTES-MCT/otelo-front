import { SimulationFormRatesProviderContextWrapper } from '~/components/simulations/settings/simulation-form-context-wrapper'

export default async function RatesProviderLayout({ children }: { children: React.ReactNode }) {
  return <SimulationFormRatesProviderContextWrapper>{children}</SimulationFormRatesProviderContextWrapper>
}
