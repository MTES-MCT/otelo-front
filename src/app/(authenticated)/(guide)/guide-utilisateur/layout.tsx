import { fr } from '@codegouvfr/react-dsfr'
import { FaqSideMenu } from '~/components/faq/sidemenu'

export default function FaqPage({ children }: { children: React.ReactNode }) {
  return (
    <div className={fr.cx('fr-container')}>
      <div className={fr.cx('fr-grid-row')}>
        <div className={fr.cx('fr-col-12', 'fr-col-md-3')}>
          <FaqSideMenu />
        </div>
        <div className={fr.cx('fr-col-12', 'fr-col-md-9')}>{children}</div>
      </div>
    </div>
  )
}
