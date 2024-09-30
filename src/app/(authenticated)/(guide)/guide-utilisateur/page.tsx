import { fr } from '@codegouvfr/react-dsfr'
import { Card } from '@codegouvfr/react-dsfr/Card'
export default function FaqRedirectPage() {
  return (
    <div className={fr.cx('fr-grid-row', 'fr-grid-row--center', 'fr-my-10v')}>
      <Card
        background
        border
        desc="Cette rubrique regroupe toutes les informations nécessaires sur les différents parcours ainsi que des explications destinées à vous faire comprendre et déterminer le parcours le plus adapté à votre territoire."
        enlargeLink
        horizontal
        imageAlt="texte alternatif de l’image"
        imageUrl="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
        linkProps={{
          href: '#',
        }}
        className={fr.cx('fr-my-4v')}
        size="small"
        title="Choix du parcours"
        titleAs="h3"
      />
      <Card
        background
        border
        desc="Suivez les étapes pour comprendre comment établir le besoin en logement à l'échelle du Bassin d'Habitat."
        enlargeLink
        horizontal
        imageAlt="texte alternatif de l’image"
        imageUrl="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
        linkProps={{
          href: '#',
        }}
        size="small"
        className={fr.cx('fr-my-4v')}
        title="Parcours Bassin d'habitat"
        titleAs="h3"
      />
      <Card
        background
        border
        desc="Suivez les étapes pour comprendre comment établir le besoin en logement à l'échelle de l'EPCI."
        enlargeLink
        horizontal
        imageAlt="texte alternatif de l’image"
        imageUrl="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
        linkProps={{
          href: '#',
        }}
        size="small"
        className={fr.cx('fr-my-4v')}
        title="Parcours EPCI"
        titleAs="h3"
      />
      <Card
        background
        border
        desc="En savoir plus sur les projections des ménages fournies par Otelo ainsi que les scénarios démographiques."
        enlargeLink
        horizontal
        imageAlt="texte alternatif de l’image"
        imageUrl="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
        linkProps={{
          href: '#',
        }}
        size="small"
        className={fr.cx('fr-my-4v')}
        title="Projection des ménages"
        titleAs="h3"
      />
    </div>
  )
}
