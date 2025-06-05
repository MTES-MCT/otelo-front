import { fr } from '@codegouvfr/react-dsfr'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import CallOut from '@codegouvfr/react-dsfr/CallOut'
import classNames from 'classnames'
import styles from './faq.module.css'

export default function FaqPage() {
  return (
    <section className={fr.cx('fr-container')}>
      <h1 className={fr.cx('fr-mb-16v')}>Besoin d'aide ?</h1>
      <div className={fr.cx('fr-grid-row')}>
        <div className={classNames(fr.cx('fr-col-12', 'fr-col-md-8'), styles.aideContainer)}>
          <div className={fr.cx('fr-accordions-group', 'fr-mb-12v')}>
            <h5>Questions fréquentes</h5>
            <Accordion label="Question 1">Réponse 1</Accordion>
            <Accordion label="Question 2">Réponse 2</Accordion>
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
