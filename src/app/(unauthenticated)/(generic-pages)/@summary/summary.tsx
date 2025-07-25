import { SideMenu, SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import styles from './summary.module.css'

type SummaryProps = {
  items: SideMenuProps['items']
}

export function Summary({ items }: SummaryProps) {
  return <SideMenu classes={{ inner: styles.sideMenu }} align="left" burgerMenuButtonText="Sommaire" items={items} title="Sommaire" />
}
