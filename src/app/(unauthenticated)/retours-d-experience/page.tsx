import arras from '@assets/img/arras.webp'
import { fr } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import CallOut from '@codegouvfr/react-dsfr/CallOut'
import { Card } from '@codegouvfr/react-dsfr/Card'
import { CONTACT_EMAIL } from '~/utils/resources'

export default function RetoursDExperiencePage() {
  return (
    <section className={fr.cx('fr-container')}>
      <h1>Inspirez-vous d'autres territoires</h1>
      <p>
        Plus de 220 EPCI, bassins d’habitat, DDT décryptent leurs besoins en logement via Otelo. <br />
        <strong>Découvrez leurs contextes, leurs enjeux et leurs choix de scénarios :</strong>
      </p>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-pb-18v')}>
        <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4', 'fr-col-xl-3')}>
          <Card
            linkProps={{ href: '/assets/Etude de cas - Arras.pptx' }}
            background
            border
            desc="Une réduction de 25% de l’objectif de construction en logements."
            size="medium"
            imageAlt="texte alternatif de l’image"
            imageUrl={arras.src}
            enlargeLink
            start={
              <ul className="fr-badges-group">
                <li>
                  <Badge>Arras</Badge>
                </li>
              </ul>
            }
            title="EPCI de Arras"
            titleAs="h3"
          />
        </div>
      </div>

      <CallOut title="Des questions ? Prêt à rejoindre Otelo ?">
        Contactez l’équipe Otelo à l’adresse : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </CallOut>
    </section>
  )
}
