import styles from "./Navigation.module.scss";
import { NavMenuType } from "./types";
import NavItem from "./NavItem";

export default function VerticalNavMenu({ root, children }: NavMenuType) {
  if (!children && !root) {
    return;
  }
  if (!children && root) {
    return (
      <NavItem
        title={root.title}
        link={root.link}
        icon={root?.icon}
        imageAlt={root?.imageAlt}
      />
    );
  }
  return (
    <div className={styles.verticalNavMenu}>
      <div className={styles.verticalNavMenu__root}>
        <NavItem
          key={`${root.title}_root`}
          isRoot
          title={root.title}
          link={root.link}
          icon={root?.icon}
          imageAlt={root?.imageAlt}
        />
        <ul className={styles.verticalNavMenu__root__children}>
          {children.map((child) => {
            return VerticalNavMenu(child);
          })}
        </ul>
      </div>
    </div>
  );
}
