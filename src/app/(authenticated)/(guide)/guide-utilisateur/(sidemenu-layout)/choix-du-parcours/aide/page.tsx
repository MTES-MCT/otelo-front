import { fr } from '@codegouvfr/react-dsfr'
import Image from 'next/image'

export default function AidePage() {
  return (
    <>
      <h1>Comment choisir son parcours ?</h1>
      <h6>Deux échelles territoriales imbriquées pour concilier cohérence méthodologique et exigences operationnelles.</h6>
      <p>
        Au sein d&apos;une région, Otelo repose sur une partition du territoire en{' '}
        <span className={fr.cx('fr-text--bold')}>2 échelles imbriquées</span> : l&apos;EPCI et le bassin d&apos;habitat, constitué d&apos;un
        regroupement d&apos;EPCI.
      </p>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--center', 'fr-my-10v')}>
        <Image src="/assets/img/faq-mailles.png" width={640} height={220} alt="Maillage des bassins d'habitat - Otelo" />
      </div>
      <p>
        Ces échelles répondent chacune à une{' '}
        <span className={fr.cx('fr-text--bold')}>exigence différente en matière d&apos;évaluation des besoins en logements </span>:
      </p>
      <ul className={fr.cx('fr-list')}>
        <li>
          L&apos;échelle du <span className={fr.cx('fr-text--bold')}>bassin d&apos;habitat</span> ou marché local de l&apos;habitat,
          correspond à l&apos;espace au sein duquel les ménages effectuent leur choix résidentiel. C&apos;est à cette échelle qu&apos;il est
          le plus pertinent, d&apos;un point de vue statistique, d&apos;évaluer le besoin en logements.
        </li>
        <li>
          L&apos;échelle de <span className={fr.cx('fr-text--bold')}>l&apos;EPCI</span> sur laquelle est mise en œuvre la plupart des
          politiques locales de l&apos;habitat. Les diagnostics des Programmes Locaux de l&apos;Habitat (PLH) comportent des estimations des
          besoins en logements qui sont ensuite traduites dans des programmations annualisées et territorialisées.
        </li>
      </ul>
      <p>
        Vous disposez d&apos;un accès régional, c&apos;est-à-dire que vous pouvez travailler sur les bassins d&apos;habitat qui intersectent
        votre région uniquement. Les bassins d&apos;habitat ont été constitués spécifiquement pour Otelo à partir de regroupements
        d&apos;EPCI.
      </p>
    </>
  )
}
