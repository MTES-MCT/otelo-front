import book from '@assets/img/book.svg'
import ecosystem from '@assets/img/ecosystem.svg'
import methodologie from '@assets/img/methodologie.svg'
import { fr } from '@codegouvfr/react-dsfr'
import { Tile } from '@codegouvfr/react-dsfr/Tile'
import classNames from 'classnames'
import styles from './section-services.module.css'

export const SectionServices = () => {
  return (
    <section className={classNames(fr.cx('fr-py-20v'), styles.section)}>
      <div className={classNames(fr.cx('fr-container'), styles.center)}>
        <h2 className={fr.cx('fr-h2', 'fr-mb-3w')}>Les services en libre accès</h2>

        <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
          <div className={fr.cx('fr-col-12', 'fr-col-md-4')}>
            <Tile
              classes={{ img: 'fr-mb-0' }}
              imageUrl={methodologie.src}
              small
              orientation="vertical"
              title="Méthodologie"
              titleAs="h3"
              desc="Découvrez le détail de la méthodologie Otelo, co-construite par la DGALN du Ministère de la Transition Ecologique, et par le Cerema."
              linkProps={{ href: '/methodologie' }}
            />
          </div>
          <div className={fr.cx('fr-col-12', 'fr-col-md-4')}>
            <Tile
              classes={{ img: 'fr-mb-0' }}
              imageUrl={book.src}
              small
              orientation="vertical"
              title="Ressources"
              titleAs="h3"
              desc="Mettez à jour vos connaissances sur l'urbanisme et l'habitat grâce aux ressources de nos partenaires et aux replays de nos webinaires."
              linkProps={{ href: '/ressources' }}
            />
          </div>
          <div className={fr.cx('fr-col-12', 'fr-col-md-4')}>
            <Tile
              classes={{ img: 'fr-mb-0' }}
              imageUrl={ecosystem.src}
              small
              orientation="vertical"
              title="Retours d'expérience"
              titleAs="h3"
              desc="Découvrez des exemples concrets d'autres territoires : diagnostics de leurs besoins en logement, extraits de documents d'urbanisme..."
              linkProps={{ href: 'retours-d-experience' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
