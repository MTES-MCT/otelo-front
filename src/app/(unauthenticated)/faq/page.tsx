import { fr } from '@codegouvfr/react-dsfr'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import CallOut from '@codegouvfr/react-dsfr/CallOut'
import classNames from 'classnames'
import styles from './faq.module.css'

export default function FaqPage() {
  return (
    <section className={fr.cx('fr-container')}>
      <h1 className={fr.cx('fr-mb-16v')}>Questions fréquentes</h1>
      <div className={fr.cx('fr-grid-row')}>
        <div className={classNames(fr.cx('fr-col-12', 'fr-col-md-8'), styles.aideContainer)}>
          <div className={fr.cx('fr-accordions-group', 'fr-mb-12v')}>
            <h5>🏠 Présentation générale d'Otelo</h5>
            <Accordion label="Qu'est-ce qu'Otelo ?">
              <p>
                <strong>Otelo</strong> est un outil numérique développé par la <strong>DGALN</strong>
                (Direction Générale de l'Aménagement, du Logement et de la Nature) et le <strong>Cerema</strong> (Centre d'études et
                d'expertise sur les risques, l'environnement, la mobilité et l'aménagement).
              </p>

              <p>
                <strong>Son objectif :</strong> Aider les collectivités à estimer précisément leurs besoins en logement en analysant :
              </p>

              <ul>
                <li>
                  📈 <strong>Les besoins futurs</strong> : logements nécessaires pour les nouveaux habitants
                </li>
                <li>
                  🏚️ <strong>Les besoins actuels</strong> : logements pour résoudre le mal-logement existant
                </li>
              </ul>

              <p>
                <strong>Depuis mai 2023</strong>, Otelo bénéficie de l'accompagnement de <strong>beta.gouv</strong> et de la{' '}
                <strong>Fabrique Numérique</strong>, l'incubateur d'innovation du Ministère de la Transition Écologique.
              </p>
            </Accordion>
            <Accordion label="Pourquoi utiliser Otelo ?">
              <p>
                <strong>Les avantages :</strong>
              </p>

              <ul>
                <li>
                  ✅ <strong>Harmonise les méthodes</strong> d'estimation des besoins en logement
                </li>
                <li>
                  📊 <strong>Structure vos projections</strong> démographiques et d'habitat
                </li>
                <li>
                  🔄 <strong>Compare différents scénarios</strong> pour optimiser vos choix
                </li>
                <li>
                  📋 <strong>Facilite l'élaboration</strong> des documents d'urbanisme (PLH, SCoT, PLUi)
                </li>
              </ul>

              <p>
                <strong>Traduction des acronymes :</strong>
              </p>

              <ul>
                <li>
                  <strong>PLH</strong> : Programme Local de l'Habitat
                </li>
                <li>
                  <strong>SCoT</strong> : Schéma de Cohérence Territoriale
                </li>
                <li>
                  <strong>PLUi</strong> : Plan Local d'Urbanisme intercommunal
                </li>
              </ul>
            </Accordion>
          </div>

          <div className={fr.cx('fr-accordions-group', 'fr-mb-12v')}>
            <h5>👥 Accès et utilisation</h5>
            <Accordion label="Qui peut utiliser Otelo ?">
              <p>
                <strong>Utilisateurs autorisés :</strong>
              </p>

              <ul>
                <li>
                  🏛️ <strong>Collectivités territoriales</strong> (communes, intercommunalités, départements, régions)
                </li>
                <li>
                  🏢 <strong>Services de l'État</strong> (DDT, DREAL, etc.)
                </li>
                <li>
                  🏗️ <strong>Organismes publics et parapublics</strong> :
                  <ul>
                    <li>Agences d'urbanisme</li>
                    <li>EPF (Établissements Publics Fonciers)</li>
                    <li>Bailleurs sociaux</li>
                  </ul>
                </li>
                <li>
                  📝 <strong>Bureaux d'études</strong> mandatés par une collectivité
                </li>
              </ul>
            </Accordion>
            <Accordion label="Comment obtenir un accès à Otelo ?">
              <p>
                <strong>Pour un premier accès :</strong> Déposez votre demande sur <strong>Démarches Simplifiées</strong> (lien fourni lors
                de l'inscription)
              </p>

              <p>
                <strong>Pour ajouter des utilisateurs à un accès existant :</strong> Même procédure via Démarches Simplifiées
              </p>

              <h3>
                <strong>Existe-t-il une formation pour utiliser Otelo ?</strong>
              </h3>

              <p>
                <strong>Oui, plusieurs options de formation :</strong>
              </p>

              <ul>
                <li>
                  🎥 <strong>Webinaires gratuits</strong> : inscriptions sur le site officiel
                </li>
                <li>
                  📚 <strong>Guides méthodologiques</strong> et tutoriels en ligne
                </li>
                <li>
                  💼 <strong>Études de cas pratiques</strong> pour apprendre par l'exemple
                </li>
                <li>
                  💬 <strong>Permanences d'accompagnement</strong> pour vos questions spécifiques
                </li>
              </ul>
            </Accordion>
          </div>

          <CallOut className={fr.cx('fr-mb-12v')} title="Nous n’avons pas répondu à votre question ?">
            Contactez l’équipe Otelo à l’adresse : <a href="mailto:otelo@beta.gouv.fr">otelo@beta.gouv.fr</a>
          </CallOut>

          <p>N°version (mis à jour le 12/12/1212) : Otelo xxxxx</p>
        </div>
      </div>
    </section>
  )
}
