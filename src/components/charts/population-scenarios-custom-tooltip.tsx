import { NameType, Payload as TooltipPayload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { tss } from 'tss-react'
import { TPopulationEvolution } from '~/schemas/demographic-evolution'
import { formatNumber } from '~/utils/format-numbers'

export const PopulationScenariosCustomTooltip = ({
  active,
  basePopulation,
  label,
  payload,
}: { active?: boolean; label?: string; payload?: TooltipPayload<ValueType, NameType>[]; basePopulation: TPopulationEvolution }) => {
  const { classes } = useStyles()
  if (!active || !payload?.length) return null
  return (
    <div className={classes.tooltipContainer}>
      <p className={classes.tooltipTitle}>{`Année ${label}`}</p>
      {/* biome-ignore lint/suspicious/noExplicitAny: TODO */}
      {payload.map((item: any) => {
        const evol = item.value - basePopulation[item.dataKey as keyof typeof basePopulation]
        return (
          <div key={item.dataKey} className={classes.tooltipItem}>
            <div className={classes.tooltipDot} style={{ backgroundColor: item.stroke }} />
            <span>{item.name}:</span>
            <span>
              <span className={classes.bold}>{evol > 0 ? `+${formatNumber(evol)}` : formatNumber(evol)}</span> ménages par rapport à{' '}
              <span className={classes.bold}>2021</span>
            </span>
            <span className={classes.smallText}>({formatNumber(item.value)} habitants)</span>
          </div>
        )
      })}
    </div>
  )
}

const useStyles = tss.create({
  tooltipContainer: {
    backgroundColor: 'white',
    border: '1px solid var(--border-default-grey)',
    borderRadius: '4px',
    padding: '1rem',
  },
  tooltipTitle: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  tooltipItem: {
    alignItems: 'center',
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.25rem',
  },
  tooltipDot: {
    borderRadius: '50%',
    height: '8px',
    width: '8px',
  },
  bold: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: '10px',
  },
})
