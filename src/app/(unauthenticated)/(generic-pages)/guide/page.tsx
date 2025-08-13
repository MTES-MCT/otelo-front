import { Table } from '@codegouvfr/react-dsfr/Table'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Guide d'utilisation Otelo",
}

export default function GuidePage() {
  return (
    <>
      <h1>Guide d'utilisation - Otelo</h1>

      <h2>🏠 Qu'est-ce qu'Otelo ?</h2>

      <p>
        Otelo est un outil d'aide à la décision qui permet d'analyser et de projeter l'évolution démographique de votre territoire. Il vous
        aide à comprendre comment la population va évoluer dans les années à venir et à prendre des décisions éclairées en matière
        d'aménagement du territoire.
      </p>

      <hr />

      <h2>📍 Les différentes échelles géographiques</h2>

      <h3>Présentation des deux échelles géographiques</h3>

      <p>Otelo vous permet de travailler à deux niveaux différents selon vos besoins :</p>

      <h4>🏘️ Les bassins d'habitat</h4>

      <p>
        <strong>Qu'est-ce que c'est ?</strong> Un bassin d'habitat est une zone géographique où les habitants vivent et travaillent au
        quotidien. C'est un territoire cohérent du point de vue des déplacements domicile-travail et des services utilisés par les
        habitants.
      </p>

      <p>
        <strong>Pourquoi utiliser cette échelle ?</strong>
      </p>

      <ul>
        <li>Pour comprendre les dynamiques locales de logement</li>
        <li>Pour analyser les flux de population entre zones résidentielles et zones d'emploi</li>
        <li>Pour adapter l'offre de services à la population</li>
      </ul>

      <h4>🏛️ Les EPCI</h4>

      <p>
        <strong>Qu'est-ce que c'est ?</strong> EPCI signifie "Établissement Public de Coopération Intercommunale". Ce sont des regroupements
        de communes qui travaillent ensemble sur des projets communs (ex: communautés de communes, communautés d'agglomération, métropoles).
      </p>

      <p>
        <strong>Pourquoi utiliser cette échelle ?</strong>
      </p>

      <ul>
        <li>Pour respecter les périmètres administratifs des documents d'urbanisme</li>
        <li>Pour coordonner les politiques publiques entre communes</li>
        <li>Pour planifier les équipements et services intercommunaux</li>
      </ul>

      <hr />

      <h2>📊 Projections démographiques</h2>

      <h3>Comprendre les projections démographique</h3>

      <p>
        Cette section vous permet de visualiser comment la population et le nombre de ménages de votre territoire vont évoluer dans les
        années à venir.
      </p>

      <p>
        <strong>Ce que vous pouvez analyser :</strong>
      </p>

      <ul>
        <li>
          👥 <strong>Évolution du nombre d'habitants</strong> : augmentation ou diminution de la population
        </li>
        <li>
          🏠 <strong>Évolution du nombre de ménages</strong> : nombre de foyers/logements nécessaires
        </li>
        <li>
          👶👴 <strong>Structure par âge</strong> : répartition entre jeunes, actifs et seniors
        </li>
        <li>
          📈 <strong>Tendances sur 10-20 ans</strong> : projections à moyen et long terme
        </li>
      </ul>

      <p>
        <strong>Pourquoi c'est important ?</strong> Ces projections vous aident à :
      </p>

      <ul>
        <li>Planifier la construction de nouveaux logements</li>
        <li>Adapter les équipements publics (écoles, crèches, maisons de retraite)</li>
        <li>Prévoir les besoins en transport et services</li>
        <li>Anticiper les évolutions économiques du territoire</li>
      </ul>

      <h3>🧠 Comprendre comment sont élaborées les projections démographiques</h3>

      <p>
        Otelo vous propose des projections du <strong>nombre de ménages</strong> jusqu'en 2050, construites à partir des{' '}
        <strong>projections de population de l'Insee</strong> (modèle <strong>Omphale</strong>) et d'une méthode développée avec l'
        <strong>Insee</strong> et le <strong>SDES</strong>, pour obtenir un nombre de ménages.
        <br />
        Cette méthode tient compte de l'évolution des comportements de vie (cohabitation, décohabitation, etc.).
      </p>

      <p>
        🗺️ <strong>Quels territoires sont couverts ?</strong>
      </p>

      <ul>
        <li>
          <strong>EPCI de plus de 50 000 habitants</strong> : projection fournie directement par l'Insee via le modèle Omphale.
        </li>
        <li>
          <strong>EPCI de moins de 50 000 habitants</strong> (soit 79 % des EPCI en 2023) : projection calculée à partir d'un territoire
          plus large.
        </li>
      </ul>

      <p>
        🔄 <strong>Méthode utilisée selon les cas</strong>
      </p>

      <h4>Cas général : à partir du bassin d'habitat</h4>

      <ul>
        <li>
          Si aucun EPCI du bassin n'a de projection propre : la projection du bassin est répartie entre les EPCI au prorata du nombre de
          ménages en 2021.
        </li>
        <li>
          Si un ou plusieurs EPCI ont une projection propre : ils la conservent ; les autres partagent le reste de la projection du bassin.{' '}
          <em>Pour en savoir plus sur la ventilation des projections ⇒ Section Ventilation.</em>
        </li>
      </ul>

      <p>
        <strong>Cas particulier : à partir du département</strong>
        <br />
        Dans certains bassins, l'Insee a identifié des projections peu fiables (anomalies fortes par rapport aux tendances passées).
        <br />
        Dans ce cas, Otelo utilise une <strong>projection départementale</strong>, ventilée entre les EPCI selon leur poids en ménages.
        <br />
        Si un EPCI est présent dans plusieurs départements, la répartition est ajustée proportionnellement.
      </p>

      <p>
        🧮 <strong>Les scénarios de décohabitation</strong>
        <br />
        <strong>Comment sont estimés les ménages à partir de la population ?</strong>
      </p>

      <p>
        Les projections de ménages tiennent compte des <strong>changements dans les modes de vie</strong> : vivre seul, en couple, en
        famille, en structure collective…
      </p>

      <p>
        Otelo propose <strong>3 scénarios</strong>, basés sur l'analyse des recensements 2008 et 2018 :
      </p>

      <Table
        caption="Scénarios de décohabitation"
        headers={['Scénario', 'Hypothèse principale']}
        data={[
          ['🟢 Tendanciel', "Prolonge les évolutions récentes jusqu'en 2030, puis ralentit jusqu'en 2050"],
          [
            '🔺 Accélération',
            'Décohabitation plus rapide (plus de jeunes seuls, moins de vie en couple, départ plus tardif en structure collective)',
          ],
          ['🔻 Décélération', 'Décohabitation plus lente (plus de vie en couple, plus de cohabitation intergénérationnelle, etc.)'],
        ]}
        noScroll
      />

      <p>
        Ces scénarios influencent directement <strong>le nombre de logements à prévoir</strong> pour un même niveau de population. Plus la
        décohabitation est forte, plus il faut de logements.
      </p>

      <h3>🔍Ventilation des projections : une méthode reflétant les dynamiques locales</h3>

      <p>
        Lorsque les EPCI n'ont pas de projection de ménages propre, Otelo estime leur évolution démographique à partir de celle du bassin
        d'habitat.
      </p>

      <h4>🔁 Une méthode de répartition dynamique</h4>

      <p>
        Pour mieux coller aux réalités locales, le <strong>CEREMA</strong> et la <strong>DHUP</strong> ont mis en place une{' '}
        <strong>clé de répartition évolutive</strong> :
      </p>

      <ul>
        <li>
          Elle démarre en 2021 à partir de la part réelle de chaque EPCI dans le bassin, selon le nombre de <strong>ménages</strong> ou de{' '}
          <strong>personnes vivant en ménage</strong>, selon le type de projection.
        </li>
        <li>
          Elle est ajustée chaque année en suivant la <strong>tendance observée entre 2015 et 2021</strong>.
        </li>
      </ul>

      <p>📆 Deux périodes différentes :</p>

      <ul>
        <li>2022–2030 : La tendance récente est appliquée chaque année.</li>
        <li>2031–2050 : La même tendance est ralentie (divisée par 2).</li>
      </ul>

      <h4>🔍 Pourquoi cette méthode est utile ?</h4>

      <ul>
        <li>
          Un <strong>EPCI en croissance</strong> continue à gagner du poids dans la projection.
        </li>
        <li>
          Un <strong>territoire en déclin</strong> peut voir sa part diminuer, même si son bassin est globalement en hausse.
        </li>
        <li>
          Résultat : chaque EPCI d'un même bassin peut atteindre son <strong>pic de population ou de ménages</strong> à des moments
          différents.
        </li>
      </ul>

      <h4>🧮 Illustration simplifiée</h4>

      <p>Un bassin de 25 000 ménages en 2021, avec 3 EPCI :</p>

      <Table
        caption="Répartition des ménages par EPCI en 2021"
        headers={['EPCI', 'Ménages en 2021', 'Part initiale']}
        data={[
          ['EPCI A', '12 500', '50 %'],
          ['EPCI B', '8 250', '33 %'],
          ['EPCI C', '4 250', '17 %'],
        ]}
        noScroll
      />

      <p>📈 Tendance observée entre 2015 et 2021 :</p>

      <ul>
        <li>EPCI A : en légère baisse de 0.1 point / an</li>
        <li>EPCI B : stable</li>
        <li>EPCI C : en progression de 0.1 point / an</li>
      </ul>

      <p>📊 Résultat avec la nouvelle méthode :</p>

      <ul>
        <li>
          En <strong>2030</strong> :
          <ul>
            <li>
              EPCI A descend à <strong>49,1 %</strong>
            </li>
            <li>
              EPCI C monte à <strong>17,9 %</strong>
            </li>
          </ul>
        </li>
        <li>
          En <strong>2050</strong> :
          <ul>
            <li>
              EPCI A descend à <strong>48,1 %</strong>
            </li>
            <li>
              EPCI C monte à <strong>18,9 %</strong>
            </li>
          </ul>
        </li>
      </ul>

      <p>
        ⚠️ <strong>Point important</strong>
        <br />
        La <strong>même logique s'applique aux projections de population</strong>.<br />
        La clé de répartition est alors calculée à partir de la <strong>part de la population vivant en ménage</strong> dans chaque EPCI.
      </p>

      <h3>📊 Les projections de population dans Otelo</h3>

      <h4>Anticiper l'évolution démographique de votre territoire jusqu'en 2050</h4>

      <p>
        Otelo s'appuie sur les projections démographiques Omphale de l'Insee, un modèle de référence qui simule l'évolution de la population
        selon différentes hypothèses de natalité, de mortalité et de migration.
      </p>

      <h4>🗺️ Quels territoires sont couverts ?</h4>

      <p>Les règles de diffusion sont les mêmes que pour les projections de ménages :</p>

      <ul>
        <li>EPCI de plus de 50 000 habitants : projection disponible directement via l'Insee.</li>
        <li>
          EPCI de moins de 50 000 habitants : projection calculée à partir d'un bassin d'habitat (ou d'un département dans certains cas).
        </li>
      </ul>

      <h4>🔁 Méthodes de répartition</h4>

      <strong>Cas général : à partir du bassin d'habitat</strong>
      <p>
        Quand plusieurs EPCI d'un bassin n'ont pas de projection propre, Otelo répartit la projection globale du bassin entre eux. Cette
        répartition suit une clé dynamique, qui évolue chaque année selon les tendances récentes observées (
        <em>voir rubrique dédiée à la ventilation dynamique</em>).
      </p>

      <strong>Cas particulier : à partir du département</strong>
      <p>
        Dans certains bassins, les projections Omphale ont été jugées non fiables (fortes ruptures de tendance). Otelo utilise alors la
        projection du département, ventilée entre les EPCI selon leur poids démographique.
      </p>

      <p>
        <strong>🧭 Les scénarios de population dans Otelo</strong>
        <br />
        Otelo propose trois scénarios démographiques, élaborés par l'Insee dans le modèle Omphale. Chaque scénario repose sur des hypothèses
        différentes de fécondité, de mortalité et de migration :
      </p>

      <Table
        caption="Scénarios démographiques Omphale"
        headers={['Scénario', 'Central', 'Population Haute', 'Population Basse']}
        data={[
          ['Fécondité', 'ICF stable à 1,8 dès 2023', 'ICF stable à 2,0 dès 2023', 'ICF stable à 1,6 dès 2023'],
          [
            'Espérance de vie',
            'Femmes : 90,0 ans / Hommes : 87,6',
            'Femmes : 93,5 ans / Hommes : 91,0',
            'Femmes : 86,5 ans / Hommes : 84,0',
          ],
          ['Migration (étranger)', 'Solde stable à +70 000/an', 'Solde à +120 000/an', 'Solde à +20 000/an'],
        ]}
        noScroll
      />

      <h4>📌 À noter :</h4>

      <p>
        Les migrations entre zones françaises (ex. d'une région à une autre) sont considérées comme constantes dans tous les scénarios. Cela
        signifie qu'à l'échelle locale, Otelo prolonge les tendances passées.
      </p>

      <h4>📎 Pour approfondir :</h4>

      <p>
        Vous pouvez consulter le solde naturel et le solde migratoire de votre territoire jusqu'en 2021 via les dossiers complets
        disponibles sur{' '}
        <a href="https://www.insee.fr" target="_blank">
          insee.fr
        </a>
        .
      </p>

      <hr />

      <h2>🎯 Élaborer un scénario</h2>

      <h3>Comment créer votre scénario d'évolution</h3>

      <p>Cette section vous guide pour construire différents scénarios d'évolution de votre territoire.</p>

      <h4>Étapes recommandées :</h4>

      <h4>1. 📋 Diagnostic de situation</h4>

      <ul>
        <li>Analysez les données actuelles de votre territoire</li>
        <li>Identifiez les tendances passées</li>
        <li>Repérez les spécificités locales</li>
      </ul>

      <h4>2. 🎛️ Définition des paramètres</h4>

      <ul>
        <li>Choisissez vos hypothèses d'évolution (croissance, stabilité, déclin)</li>
        <li>Ajustez selon vos projets d'aménagement</li>
        <li>Intégrez les politiques publiques prévues</li>
      </ul>

      <h4>3. 📈 Simulation et analyse</h4>

      <ul>
        <li>Lancez les projections avec vos paramètres</li>
        <li>Comparez différents scénarios</li>
        <li>Analysez les impacts sur votre territoire</li>
      </ul>

      <h4>4. ✅ Validation et ajustements</h4>

      <ul>
        <li>Vérifiez la cohérence des résultats</li>
        <li>Ajustez si nécessaire</li>
        <li>Validez votre scénario final</li>
      </ul>

      <hr />

      <h2>🛠️ Comment bien utiliser Otelo</h2>

      <h3>Conseils pratiques</h3>

      <h4>✅ Bonnes pratiques :</h4>

      <ul>
        <li>Commencez par explorer les données existantes avant de créer un scénario</li>
        <li>Comparez toujours plusieurs hypothèses d'évolution</li>
        <li>Prenez en compte les projets d'aménagement en cours sur votre territoire</li>
        <li>Confrontez vos résultats avec d'autres sources de données</li>
      </ul>

      <h4>⚠️ Points d'attention :</h4>

      <ul>
        <li>Les projections sont des estimations, pas des certitudes</li>
        <li>Plus l'horizon temporel est lointain, plus l'incertitude augmente</li>
        <li>Actualisez régulièrement vos analyses avec de nouvelles données</li>
      </ul>

      <h3>Support et assistance</h3>

      <h4>En cas de difficulté :</h4>

      <ul>
        <li>Consultez les exemples intégrés dans l'outil</li>
        <li>Référez-vous aux définitions des termes techniques</li>
        <li>Contactez l'équipe support pour un accompagnement personnalisé</li>
      </ul>

      <hr />

      <h2>📚 Glossaire</h2>

      <p>
        <strong>Bassin d'habitat</strong> : Zone géographique cohérente du point de vue des déplacements domicile-travail et de
        l'utilisation des services.
      </p>

      <p>
        <strong>EPCI</strong> : Établissement Public de Coopération Intercommunale - Regroupement de communes travaillant ensemble.
      </p>

      <p>
        <strong>Projection démographique</strong> : Estimation de l'évolution future de la population basée sur les tendances passées et des
        hypothèses d'évolution.
      </p>

      <p>
        <strong>Ménage</strong> : Ensemble des personnes (apparentées ou non) qui partagent le même logement.
      </p>

      <p>
        <strong>Scénario</strong> : Simulation d'évolution basée sur des hypothèses définies par l'utilisateur.
      </p>
    </>
  )
}
