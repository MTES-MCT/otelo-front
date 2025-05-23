import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

export default function BreadcrumbSlot() {
  return (
    <Breadcrumb
      currentPageLabel="Ressources"
      homeLinkProps={{
        href: '/accueil',
      }}
      segments={[]}
    />
  )
}
