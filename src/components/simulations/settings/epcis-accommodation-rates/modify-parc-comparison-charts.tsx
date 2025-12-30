import classNames from 'classnames'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/rates-provider'
import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'
import styles from './parc-comparison-charts.module.css'

interface SegmentData {
  name: string
  value: number
  color: string
}

interface CustomBarProps {
  data: SegmentData[]
  height?: number
}

const COLORS = {
  shortTermVacantAccomodation: '#000091',
  longTermVacantAccomodation: '#9898F8',
  secondaryAccommodation: '#E9C53B',
  default: '#E5E5E5',
}

const ModifyParcsComparisonCharts = ({
  epci,
  withSecondaryAccommodation = true,
}: { epci: string; withSecondaryAccommodation?: boolean }) => {
  const { defaultRates } = useEpcisRates()
  const { simulationSettings } = useSimulationSettings()

  const defaultRatesByEpci = defaultRates[epci]
  const simulationRatesByEpci = simulationSettings.epciScenarios[epci]

  if (!defaultRatesByEpci || !simulationRatesByEpci) return null

  const originalSecondaryAccommodationRate = Number(defaultRatesByEpci.txRS * 100)
  const originalLongTermRate = Number(defaultRatesByEpci.longTermVacancyRate * 100)
  const shortTermRate = Number(defaultRatesByEpci.shortTermVacancyRate * 100)

  const computedLongTermRate = Number(simulationRatesByEpci.longTermVacancyRate * 100)
  const computedSecondaryAccommodationRate = Number(simulationRatesByEpci.txRs * 100)

  // Calculate dynamic scale with round numbers and unified scale
  const calculateUnifiedScale = () => {
    const vacancy2021 = shortTermRate + originalLongTermRate + (withSecondaryAccommodation ? originalSecondaryAccommodationRate : 0)
    const vacancyComputed = shortTermRate + computedLongTermRate + (withSecondaryAccommodation ? computedSecondaryAccommodationRate : 0)

    const maxVacancy = Math.max(vacancy2021, vacancyComputed)

    // Use dynamic scale if max vacancy rates are low, otherwise use 100%
    if (maxVacancy < 30) {
      const suggestedScale = Math.ceil(maxVacancy * 1.3)
      // Round to nearest 5 or 10 for clean numbers
      if (suggestedScale <= 20) {
        return Math.ceil(suggestedScale / 5) * 5 // Round to nearest 5
      } else {
        return Math.ceil(suggestedScale / 10) * 10 // Round to nearest 10
      }
    }
    return 100
  }

  const unifiedScale = calculateUnifiedScale()

  const createScaledData = (shortTerm: number, longTerm: number, secondary: number, scale: number): SegmentData[] => {
    const vacancy = shortTerm + longTerm + (withSecondaryAccommodation ? secondary : 0)
    const parcTotal = scale - vacancy

    return [
      {
        name: 'Taux de logements vacants courte durée',
        value: (shortTerm / scale) * 100,
        color: COLORS.shortTermVacantAccomodation,
      },
      {
        name: 'Taux de logements vacants longue durée',
        value: (longTerm / scale) * 100,
        color: COLORS.longTermVacantAccomodation,
      },
      ...(withSecondaryAccommodation
        ? [
            {
              name: 'Taux de résidences secondaires',
              value: (secondary / scale) * 100,
              color: COLORS.secondaryAccommodation,
            },
          ]
        : []),
      {
        name: 'Parc total',
        value: (parcTotal / scale) * 100,
        color: COLORS.default,
      },
    ]
  }

  const data2021 = createScaledData(shortTermRate, originalLongTermRate, originalSecondaryAccommodationRate, unifiedScale)
  const computedData = createScaledData(shortTermRate, computedLongTermRate, computedSecondaryAccommodationRate, unifiedScale)

  const CustomBar = ({ data, height = 32 }: CustomBarProps) => (
    <div className="fr-position-relative fr-width-full" style={{ height: `${height}px` }}>
      <div className="fr-position-absolute fr-flex fr-height-full">
        {data.map((segment, index) => (
          <div
            key={index}
            style={{
              width: `${segment.value}%`,
              backgroundColor: segment.color,
              height: '100%',
            }}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className={classNames(styles.chartContainer, 'fr-p-3w')}>
      <div className="fr-flex fr-direction-column">
        <div className="fr-flex fr-flex-gap-2v fr-justify-content-end">
          <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
            <div style={{ width: '12px', height: '12px', backgroundColor: COLORS.shortTermVacantAccomodation }} />
            <span className="fr-text--sm fr-mb-0">Vacance courte durée</span>
          </div>
          <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
            <div style={{ width: '12px', height: '12px', backgroundColor: COLORS.longTermVacantAccomodation }} />
            <span className="fr-text--sm fr-mb-0">Vacance longue durée</span>
          </div>
          {!!withSecondaryAccommodation && (
            <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
              <div style={{ width: '12px', height: '12px', backgroundColor: COLORS.secondaryAccommodation }} />
              <span className="fr-text--sm fr-mb-0">Résidences secondaires</span>
            </div>
          )}
        </div>
        {/* 2021 Section */}
        <div className="fr-flex fr-direction-column fr-flex-gap-2v fr-mb-3w">
          <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
            <span className="fr-text--medium">Le parc en 2021</span>
            <span className="fr-text--sm fr-text-mention--grey">Échelle: 0-{unifiedScale}%</span>
          </div>
          <CustomBar data={data2021} />
        </div>

        {/* projection section */}
        <div className="fr-flex fr-direction-column fr-flex-gap-2v">
          <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
            <span className="fr-text--medium">Le parc en 2050</span>
            <span className="fr-text--sm fr-text-mention--grey">Échelle: 0-{unifiedScale}%</span>
          </div>
          <CustomBar data={computedData} />
        </div>
      </div>
    </div>
  )
}

export default ModifyParcsComparisonCharts
