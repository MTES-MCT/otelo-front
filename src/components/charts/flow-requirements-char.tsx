'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { FC } from 'react'
import { Bar, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { CartesianGrid } from 'recharts'
import { BarChart } from 'recharts'
import { ResponsiveContainer } from 'recharts'
import { tss } from 'tss-react'
import { DemographicEvolutionResultsTable } from '~/components/simulations/results/demographic-evolution-results-table'
import { formatNumber } from '~/utils/format-numbers'

interface FlowRequirementsChartProps {
  results: {
    demographicEvolution: number
    renewalNeeds: number
    secondaryResidenceAccomodationEvolution: number
    totalFlux: number
    vacantAccomodationEvolution: number
    shortTermVacantAccomodation: number
    longTermVacantAccomodation: number
  }
}

export const FlowRequirementsChart: FC<FlowRequirementsChartProps> = ({ results }) => {
  const {
    demographicEvolution,
    renewalNeeds,
    secondaryResidenceAccomodationEvolution,
    totalFlux,
    vacantAccomodationEvolution,
    shortTermVacantAccomodation,
    longTermVacantAccomodation,
  } = results

  const positiveData = {
    name: "Besoin en logements liés à l'évolution démographique et à l'évolution du parc",
    ...(demographicEvolution > 0 && { demographicEvolution }),
    ...(renewalNeeds > 0 && { renewalNeeds }),
    ...(secondaryResidenceAccomodationEvolution > 0 && { secondaryResidenceAccomodationEvolution }),
    ...(longTermVacantAccomodation > 0 && { longTermVacantAccomodation: 0 }),
    ...(shortTermVacantAccomodation > 0 && { shortTermVacantAccomodation }),
  }

  const negativeData = {
    name: 'Mobilisation du parc existant',
    ...(longTermVacantAccomodation < 0 && {
      longTermVacantAccomodation: Math.abs(longTermVacantAccomodation),
    }),
    ...(renewalNeeds < 0 && { renewalNeeds: Math.abs(renewalNeeds) }),
  }

  const hasNegativeValues = Object.keys(negativeData).length > 1 // > 1 because it always has 'name'

  const chartData = [
    positiveData,
    ...(hasNegativeValues ? [negativeData] : []),
    {
      name: 'Construction neuves supplémentaires',
      totalFlux: Math.abs(totalFlux),
    },
  ]

  const { classes } = useStyles()

  return (
    <div className={classes.rowContainer}>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              bottom: 5,
              left: 20,
              right: 30,
              top: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="demographicEvolution" name="Démographie" stackId="a" fill="#4F46E5" />
            <Bar dataKey="secondaryResidenceAccomodationEvolution" name="Résidences secondaires" stackId="a" fill="#EC4899" />
            <Bar dataKey="longTermVacantAccomodation" name="Logements vacants de longue durée" stackId="a" fill="#10B981" />
            <Bar dataKey="shortTermVacantAccomodation" name="Logements vacants de courte durée" stackId="a" fill="#10B981" />
            <Bar dataKey="renewalNeeds" name="Renouvellement" stackId="a" fill="#F59E0B" />
            <Bar dataKey="totalFlux" name="Demande potentielle" stackId="a" fill="#6366F1" />
            <Legend
              content={
                <p style={{ color: 'rgb(136, 132, 216)', margin: 0 }}>
                  Évolution du besoin liés à la démographie et à l'évolution du parc détaillé
                </p>
              }
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className={fr.cx('fr-mb-0')}>
          <span className={fr.cx('fr-text--bold')}>Clé de lecture</span> : Le graphique et le tableau représentent l'influence de la
          démographie et de l'évolution du parc sur le besoin en constructions neuves. Par exemple :
        </p>
        <ul>
          <li>
            L'évolution du nombre de ménages à loger dans le territoire contribue pour {formatNumber(Math.abs(demographicEvolution))} au
            besoin en logements.
          </li>
          <li>
            Pour garder de la fluidité dans le parc de logement, il est nécessaire de produire {formatNumber(shortTermVacantAccomodation)}{' '}
            logements.
          </li>
          <li>
            {secondaryResidenceAccomodationEvolution > 0 && (
              <>
                L'évolution du nombre de résidences secondaires contribue à hauteur de&nbsp;
                {formatNumber(secondaryResidenceAccomodationEvolution)} dans les besoins en constructions neuves, leur nombre augmentant au
                cours de la période de projection.
              </>
            )}
            {secondaryResidenceAccomodationEvolution < 0 && (
              <>
                L'hypothèse choisie sur les résidences secondaires implique une remobilisation de&nbsp;
                {formatNumber(Math.abs(secondaryResidenceAccomodationEvolution))} résidences secondaires.
              </>
            )}

            {secondaryResidenceAccomodationEvolution === 0 && (
              <>L'hypothèse choisie sur les résidences secondaires n'implique pas de remobilisation de résidences secondaires.</>
            )}
          </li>
          <li>
            {vacantAccomodationEvolution > 0 ? (
              <>
                L'hypothèse retenue concernant le taux de vacance induit une augmentation du nombre de logements vacants de&nbsp;
                {formatNumber(vacantAccomodationEvolution)} au cours de la période de projection, qui se répercute sur le besoin en
                constructions neuves.
              </>
            ) : (
              <>
                L'hypothèse retenu de baisse de la part des logements vacants de longue durée (&gt;2ans) dans le parc implique la
                remobilisation de {formatNumber(Math.abs(longTermVacantAccomodation))} logements.
              </>
            )}
          </li>
          <li>
            Le renouvellement du parc contribue à hauteur de {formatNumber(Math.abs(renewalNeeds))} aux besoins en logements, les&nbsp;
            {renewalNeeds > 0 ? 'créations' : 'démolitions'} de logements au sein du parc excédant les&nbsp;
            {renewalNeeds > 0 ? 'démolitions' : 'créations'}.
          </li>
        </ul>
      </div>
      <div className={classes.tableContainer}>
        <DemographicEvolutionResultsTable results={results} />
      </div>
    </div>
  )
}

const useStyles = tss.create({
  chartContainer: {
    height: '600px',
    marginBottom: '2rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
    width: '100%',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
})
