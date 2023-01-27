import styles from "./Navigation/Navigation.module.scss";
import NavMenu from "./Navigation/NavMenu";
import { NavMenuType } from "./Navigation/types";

interface Props {
  navItems: NavMenuType[]
}

const renderNavItems = (navMenuItems: NavMenuType[]) => {
  if (!navMenuItems) {
    return;
  }
  return navMenuItems.map((navMenu, i) => {
    return (
      <NavMenu
        root={navMenu.root}
        children={navMenu?.children}
        key={`${navMenu.root.title}_${i}`}
      />
    );
  });
};

export default function Navigation({navItems}: Props) {
  return (
    <div className={styles.navigationContainer}>
      {/*<div className={styles.logo}>LOGO HERE</div>*/}
      <nav className={styles.navigation}>
        {renderNavItems(navItems)}
      </nav>
    </div>
  );
}
