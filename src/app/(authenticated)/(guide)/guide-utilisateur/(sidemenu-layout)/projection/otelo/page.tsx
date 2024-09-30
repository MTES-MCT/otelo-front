import { fr } from '@codegouvfr/react-dsfr'

export default function OteloProjection() {
  return (
    <>
      <h1>Les projections des ménages fournies par Otelo</h1>
      <p>
        Les projections de ménages sont fournies par l&apos;Insee sous réserve que le territoire étudié comporte plus de 50.000 habitants.
        Otelo propose, pour les EPCI dont la taille est inférieure à ce seuil, des projections de ménages calculées à partir de celles
        disponibles à l&apos;échelle du bassin d&apos;habitat.
      </p>
      <p>
        Les projections de nombre de ménages proposées par Otelo sont établies à partir du modèle Omphale, produit par l&apos;Insee. Il
        permet d&apos;obtenir des projections de population sur la période 2013-2050 à partir de scénarios qui reposent sur différentes
        hypothèses de natalité, de mortalité et de migration. Ces projections de population sont ensuite transformées en projections de
        nombre de ménages à l&apos;aide d&apos;une méthode conçue en partenariat par la DHUP, l&apos;Insee et le SDES selon plusieurs
        scénarios de décohabitation.
      </p>

      <p className={fr.cx('fr-text--bold')}>
        Les projections ne sont fournies par l&apos;Insee que pour les territoires dont la population est supérieure à 50.000 habitants. Au
        1er janvier 2019, 980 des 1248 EPCI de France métropolitaine comptaient moins de 50.000 habitants (78,5%). Pour ces EPCI, les
        projections proposées ne sont pas directement issues d&apos;Omphale : elles sont calculées à partir des projections à l&apos;échelle
        plus large des bassins d&apos;habitat, conçus pour respecter la contrainte de 50.000 habitants minimum.
      </p>
      <p>Les chiffres proposés pour les EPCI correspondent donc aux cas de figures suivants :</p>
      <ul>
        <li>L&apos;EPCI a plus de 50.000 habitants et dispose d&apos;une projection Omphale.</li>
        <li>
          L&apos;EPCI a moins de 50.000 habitants (en 2013) et c&apos;est le cas pour l&apos;ensemble des EPCI qui compose son bassin
          d&apos;habitat. Dans ce cas, la projection n&apos;est fournie par l&apos;Insee qu&apos;à l&apos;échelle du bassin d&apos;habitat.
          Cette projection est désagrégée entre les EPCI du même bassin d&apos;habitat au prorata du poids de l&apos;EPCI dans le bassin
          d&apos;habitat, en termes de nombre de ménages en 2013. Cette répartition correspond à l&apos;hypothèse d&apos;un taux de
          croissance du nombre de ménages homogène dans l&apos;ensemble des EPCI composant le bassin d&apos;habitat.
        </li>
        <li>
          <p>
            L&apos;EPCI a moins de 50.000 habitants (en 2013) et son bassins d&apos;habitat compte un ou plusieurs EPCI de plus de 50.000
            habitants. Dans ce cas, la méthode appliquée est la suivante :
          </p>
          <ul className={fr.cx('fr-list')}>
            <li>
              On dispose de projections à l&apos;échelle du bassin d&apos;habitat, et d&apos;un ou plusieurs EPCI de plus de 50.000
              habitants.
            </li>
            <li>
              On fait une hypothèse de croissance homogène dans les EPCI de moins de 50.000 habitants établie de manière à ce que la somme
              du nombre de ménages par EPCI soit égal à la projection Omphale pour le bassin de vie.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        <span className={fr.cx('fr-text--bold')}>
          La clé de répartition faite selon le nombre de ménages 2013 pour proposer une croissance homogène entre EPCI de moins de 50 000
          habitants peut se révéler inadaptée, en particulier dans les bassins d&apos;habitat constitués d&apos;EPCI aux dynamiques
          démographiques hétérogènes.{' '}
        </span>
        Vous pourrez ainsi modifier cette répartition. Lors du paramétrage de l&apos;évolution du nombre de ménages par EPCI, vous disposez
        d&apos;informations sur l&apos;évolution du nombre de ménages mesurée par le recensement, accessibles à travers les infobulles. Vous
        pouvez également vous aider des données mises à disposition par l&apos;Insee à travers le comparateur de territoire.
      </p>
    </>
  )
}
