import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

export default function BreadcrumbSlot() {
  return (
    <Breadcrumb
      currentPageLabel="Méthodologie"
      homeLinkProps={{
        href: '/accueil',
      }}
      segments={[]}
    />
  )
}
