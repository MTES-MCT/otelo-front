import { fr } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import CallOut from '@codegouvfr/react-dsfr/CallOut'
import { Card } from '@codegouvfr/react-dsfr/Card'

export default function RetoursDExperiencePage() {
  return (
    <section className={fr.cx('fr-container')}>
      <h1>Inspirez-vous d'autres territoires</h1>
      <p>
        Plus de XXXX EPCI, bassins d’habitat, DDT décryptent leurs besoins en logement via Otelo. <br />
        <strong>Découvrez leurs contextes, leurs enjeux et leurs choix de scénarios :</strong>
      </p>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-pb-18v')}>
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <div key={index} className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4', 'fr-col-xl-3')}>
              <Card
                background
                border
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua."
                imageAlt="texte alternatif de l’image"
                imageUrl="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
                size="medium"
                footer={<Button priority="tertiary no outline">label</Button>}
                start={
                  <ul className="fr-badges-group">
                    <li>
                      <Badge>LABEL</Badge>
                    </li>
                    <li>
                      <Badge severity="new">LABEL</Badge>
                    </li>
                  </ul>
                }
                title="EPCI de XXX"
                titleAs="h3"
              />
            </div>
          ))}
      </div>

      <CallOut title="Des questions ? Prêt à rejoindre Otelo ?">Contactez l’équipe Otelo à l’adresse : XXXX</CallOut>
    </section>
  )
}
