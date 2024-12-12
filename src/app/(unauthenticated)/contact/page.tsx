import { fr } from '@codegouvfr/react-dsfr'
import { ContactForm } from '~/components/contact/contact-form'

export default function ContactPage() {
  return (
    <div className={fr.cx('fr-container', 'fr-p-md-4w')} style={{ backgroundColor: fr.colors.decisions.background.default.grey.default }}>
      <h1>Contactez-nous</h1>

      <div className={fr.cx('fr-mb-4w')}>
        <h3>Nous contacter par e-mail</h3>
        <p>
          Vous pouvez nous contacter par e-mail à l&apos;adresse suivante :{' '}
          <a href="mailto:otelo@developpement-durable.gouv.fr">otelo@developpement-durable.gouv.fr</a> ou en utilisant le formulaire
          ci-dessous.
        </p>
      </div>
      <h3>Formulaire de contact</h3>
      <p>
        Les champs marqués d&apos;un <span style={{ color: 'red' }}>*</span> sont obligatoires.
      </p>
      <ContactForm />
    </div>
  )
}
