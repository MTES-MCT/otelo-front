'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import Select from '@codegouvfr/react-dsfr/Select'
import { parseAsString, useQueryStates } from 'nuqs'
import { FC, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TInadequateHousing } from '~/schemas/population-evolution'
import { formatNumber } from '~/utils/format-numbers'
import styles from './accommodation-evolution-charts.module.css'

interface MalLogementChartProps {
  data: TInadequateHousing
}

export const MalLogementChart: FC<MalLogementChartProps> = ({ data }) => {
  const [withOteloParams, setWithOteloParams] = useState(false)
  const [queryStates, setQueryStates] = useQueryStates({
    type: parseAsString,
    epci: parseAsString,
  })
  const { classes } = useStyles()

  const chartData = [
    {
      ...data[queryStates.epci as string],
      noAccommodation: data[queryStates.epci as string].noAccommodation.total,
      hosted: data[queryStates.epci as string].hosted.total,
    },
  ]
  const chartDataOteloParams = [
    {
      badQuality: chartData[0].badQuality * 0.5,
      financialInadequation: chartData[0].financialInadequation * 0.3,
      physicalInadequation: chartData[0].physicalInadequation * 0.9,
      hosted: chartData[0].hosted * 0.3,
      noAccommodation: chartData[0].noAccommodation * 0.5,
      name: chartData[0].name,
    },
  ]

  const title = DATA_TYPE_OPTIONS.find((option) => option.value === queryStates.type)?.label
  const EPCIS_OPTIONS = Object.entries(data).map(([key, value]) => ({ label: value.name, value: key }))
  const dataToDisplay = withOteloParams ? chartDataOteloParams : chartData
  const homelessMakeshiftHotelSum =
    data[queryStates.epci as string].noAccommodation.hotel +
    data[queryStates.epci as string].noAccommodation.homeless +
    data[queryStates.epci as string].noAccommodation.makeShiftHousing
  const name = data[queryStates.epci as string].name
  return (
    <>
      <div className={styles.headerContainer}>
        <h5>
          {title} - {name}
        </h5>
        <div>
          <Select
            label=""
            nativeSelectProps={{
              onChange: (event) => setQueryStates({ epci: event.target.value }),
              value: queryStates.epci || '',
            }}
          >
            {EPCIS_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
          <Checkbox
            options={[
              {
                label: 'Avec paramètres Otelo',
                nativeInputProps: {
                  checked: withOteloParams,
                  onChange: (event) => setWithOteloParams(event.target.checked),
                },
              },
            ]}
          />
        </div>
      </div>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={dataToDisplay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="badQuality" name="Mauvaise qualité" fill="#4F46E5" />
            <Bar dataKey="financialInadequation" name="Inadéquation financière" fill="#F59E0B" />
            <Bar dataKey="physicalInadequation" name="Inadéquation physique" fill="#10B981" />
            <Bar dataKey="hosted" name="Hébergés" fill="#4F46E5" />
            <Bar dataKey="noAccommodation" name="Sans logement" fill="#EC4899" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
        <div className={classes.titleContainer}>
          <span className={classes.title}>Graphique sur les situations de mal logement à {name}</span>
        </div>
      </div>
      <div>
        <p className={fr.cx('fr-mb-0')}>
          <span className={fr.cx('fr-text--bold')}>Clé de lecture :</span> Ce graphique présente le nombre de mal-logés par typologie de
          mal-logement sur le territoire de {name}. Chacune de ces situations ne génère pas nécessairement un besoin en logements
          supplémentaires : certaines peuvent être résolues par des actions sur le parc existant (réhabilitation, relogement, accompagnement
          social, etc.). La part à prendre en compte est paramétrable lors de l’élaboration d’un scenario, via l’espace “Paramétrer le
          mal-logement” de la page de résultat.
        </p>
        <p>On retrouve sur le territoire :</p>
        <ul>
          <li>
            <span className={fr.cx('fr-text--bold')}>Mauvaise qualité</span> : {formatNumber(chartData[0].badQuality)} ménages habitant un
            logement indigne, d’après le le Parc privé potentiellement indigne (2021) ;
          </li>
          <li>
            <span className={fr.cx('fr-text--bold')}>Inadéquation financière</span> : {formatNumber(chartData[0].financialInadequation)}
            &nbsp; ménages locataires du parc privé ayant un taux d’effort supérieur à 30% et bénéficiant des APL (CNAF 2022) ;
          </li>
          <li>
            <span className={fr.cx('fr-text--bold')}>Inadéquation physique</span> : {formatNumber(chartData[0].physicalInadequation)}
            &nbsp; ménages dans un logement trop petit. Les données fiscales (2021) sont mobilisées pour quantifier le nombre de
            propriétaires et locataires du parc privé vivant dans un logement comprenant deux pièces en moins ;
          </li>
          <li>
            <span className={fr.cx('fr-text--bold')}>Hébergés</span> :
            <ul>
              <li>
                {formatNumber(data[queryStates.epci as string].hosted.sne)} personnes hébergés chez un tiers, ou à titre temporaire d’après
                le SNE. ;
              </li>
              <li>{formatNumber(data[queryStates.epci as string].hosted.filocom)} familles dans une situation de cohabitation subie ;</li>
            </ul>
          </li>
          <li>
            <span className={fr.cx('fr-text--bold')}>Sans logement</span> :
            <ul>
              <li>
                {formatNumber(homelessMakeshiftHotelSum)} personnes sans abri, vivant en habitation de fortune, ou logées à l’hôtel, d’après
                les données du recensement de la population (2021). ;
              </li>
              <li>
                {formatNumber(data[queryStates.epci as string].noAccommodation.finess)} logés dans un hébergement d’urgence (FINESS 2022 -
                pour plus d’information sur les types d’hébergement d’urgence).
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
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
  title: {
    textAlign: 'center',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
})
