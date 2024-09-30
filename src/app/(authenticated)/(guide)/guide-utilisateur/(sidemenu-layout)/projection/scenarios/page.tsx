import { fr } from '@codegouvfr/react-dsfr'

export default function ScenariosPage() {
  const populationProjectionsDatas = [
    {
      category: 'Fécondité',
      central: "Baisse de l'indice conjoncturel de fécondité (ICF) de 0,04 jusqu'en 2016 puis constance jusqu'en 2050",
      populationBasse: "Baisse de l'indice conjoncturel de fécondité (ICF) de 0,19 jusqu'en 2020 puis constance jusqu'en 2050",
      populationHaute: "Hausse de l'indice conjoncturel de fécondité (ICF) de 0,11 jusqu'en 2020 puis constance jusqu'en 2050",
    },
    {
      category: 'Mortalité',
      central: "Hausse progressive de l'espérance de vie qui atteindrait 90,3 ans pour les femmes et 86,6 ans pour les hommes en 2050.",
      populationBasse:
        "Hausse progressive de l'espérance de vie qui atteindrait 88,3 ans pour les femmes et 84,5 ans pour les hommes en 2050.",
      populationHaute:
        "Hausse progressive de l'espérance de vie qui atteindrait 93 ans pour les femmes et 89,5 ans pour les hommes en 2050.",
    },
    {
      category: 'Solde migrations entre zones',
      central: 'Les migrations de zone à zone sont constantes par rapport au passé.',
      populationBasse: 'Les migrations de zone à zone sont constantes par rapport au passé.',
      populationHaute: 'Les migrations de zone à zone sont constantes par rapport au passé.',
    },
    {
      category: "Solde migrations avec l'étranger",
      central: "Déclinaison locale d'un solde France entière de +70 000 par an.",
      populationBasse: "Déclinaison locale d'un solde France entière qui converge vers + 20 000 par an en 2020 et reste stable au-delà.",
      populationHaute: "Déclinaison locale d'un solde France entière qui converge vers + 120 000 par an en 2020 et reste stable au-delà.",
    },
  ]

  const decohabitationScenarios = [
    {
      acceleration: 'Central_H',
      deceleration: 'Central_B',
      demographie: 'Central',
      maintien: 'Central_M',
      tendanciel: 'Central_C',
    },
    {
      acceleration: 'PH_H',
      deceleration: 'PH_B',
      demographie: 'Population Haute',
      maintien: 'PH_M',
      tendanciel: 'PH_C',
    },
    {
      acceleration: 'PB_H',
      deceleration: 'PB_B',
      demographie: 'Population Basse',
      maintien: 'PB_M',
      tendanciel: 'PB_C',
    },
  ]

  return (
    <>
      <h1>Les scénarios démographiques</h1>
      <p>
        Les projections de ménages proposées pour Otelo reposent sur des projections de populations établies à partir du modèle « Omphale »
        de l&apos;Insee selon 3 scénarios, auxquels sont associées scénarios de décohabitation permettant d&apos;obtenir des projections de
        nombre de ménages.
      </p>
      <h6>Projections de population</h6>
      <p>
        Les projections de nombre de ménages proposées par Otelo sont établies à partir du modèle Omphale, produit par l&apos;Insee. Il
        permet d&apos;obtenir des projections de population sur la période 2013-2050 établies selon des scénarios qui reposent sur
        différentes hypothèses de natalité, de mortalité et de migration. Trois scénarios ont été retenus pour Otelo : central, population
        haute et population basse.
      </p>
      <div className={fr.cx('fr-table', 'fr-table--bordered', 'fr-table--no-caption')}>
        <table>
          <caption>Scénarios de projection démographique</caption>
          <thead>
            <tr>
              <th scope="col">Scénario</th>
              <th scope="col">Central</th>
              <th scope="col">Population Haute</th>
              <th scope="col">Population Basse</th>
            </tr>
          </thead>
          <tbody>
            {populationProjectionsDatas.map((row, index) => (
              <tr key={index}>
                <th scope="row">{row.category}</th>
                <td>{row.central}</td>
                <td>{row.populationHaute}</td>
                <td>{row.populationBasse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Les scénarios Omphale, à l&apos;échelle infranationale ne permettent pas de faire varier les hypothèses de migrations résidentielles
        entre zones : tous les scénarios reposent sur l&apos;hypothèse du maintien des tendances passées. Néanmoins, à une échelle locale,
        l&apos;évolution des migrations résidentielles peut conduire à des ruptures de tendances démographiques. Pour examiner
        l&apos;importance de ce paramètre jusqu&apos;en 2017 à l&apos;échelle de l&apos;EPCI, vous pouvez utiliser les « Dossiers complets »
        accessibles sur le site de l&apos;Insee, qui proposent une décomposition de l&apos;évolution de la population en fonction des soldes
        naturels et migratoires :{' '}
        <a href="https://www.insee.fr/fr/statistiques/zones/2011101">https://www.insee.fr/fr/statistiques/zones/2011101</a>.
      </p>
      <h6>Projections de ménages</h6>
      <p>
        Ces projections de population sont ensuite transformées en projections de nombre de ménages à l&apos;aide d&apos;une méthode conçue
        en partenariat par la DHUP, l&apos;Insee et le SDES, selon plusieurs scénarios de décohabitation. Elles reposent sur la prolongation
        des tendances de décohabitation observées sur la période 1990-2013, qui permettent d&apos;obtenir une clé de répartition de la
        population par type de ménages à l&apos;horizon 2050. Les scénarios proposés portent sur le rythme de convergence des modes de
        cohabitation vers la cible établie pour 2050 au cours de la période 2013-2030.
      </p>
      <p>Quatre scénarios sont proposés dans Otelo :</p>
      <ul>
        <li>
          <span className={fr.cx('fr-text--bold')}>Tendanciel : </span>maintien du rythme observé par le passé ;
        </li>
        <li>
          <span className={fr.cx('fr-text--bold')}>Accélération : </span>convergence vers la cible plus rapide que par le passé ;
        </li>
        <li>
          <span className={fr.cx('fr-text--bold')}>Décélération : </span> convergence moins rapide que par le passé ;
        </li>
        <li>
          <span className={fr.cx('fr-text--bold')}>Maintien : </span>maintien de la répartition de la population projetée par type de
          ménages au cours de la période 2013-2030.
        </li>
      </ul>
      <p className={fr.cx('fr-text--bold')}>
        Les six scénarios grisés dans le tableau ci-dessous, correspondant à des associations entre scénario démographique et scénario de
        décohabitation, sont proposés lors du paramétrage de l&apos;outil.
      </p>
      <p className={fr.cx('fr-text--sm', 'fr-mt-2w')}>
        Les cellules grisées correspondent aux scénarios proposés lors du paramétrage de l&apos;outil.
      </p>
      <div className={fr.cx('fr-table')}>
        <table>
          <caption>Scénarios de décohabitation</caption>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }} colSpan={6}>
                Décohabitation
              </th>
            </tr>
            <tr>
              <th colSpan={2}></th>
              <th scope="col">Tendanciel</th>
              <th scope="col">Accélération</th>
              <th scope="col">Décélération</th>
              <th scope="col">Maintien</th>
            </tr>
          </thead>
          <tbody>
            {decohabitationScenarios.map((row, index) => (
              <tr key={index} style={{ backgroundColor: 'unset' }}>
                {index === 1 ? (
                  <td style={{ borderRight: '0.5px solid black' }}>Démographie</td>
                ) : (
                  <td style={{ borderRight: '0.5px solid black' }} />
                )}
                <th scope="row">{row.demographie}</th>
                <td>{row.tendanciel}</td>
                <td>{row.acceleration}</td>
                <td>{row.deceleration}</td>
                <td>{row.maintien}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
