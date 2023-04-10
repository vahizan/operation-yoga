import styles from "./Navigation.module.scss";
import { ReactNode } from "react";
import { NavItemType } from "./types";

const renderIcon = (
  icon: string | SVGElement | ReactNode,
  imageAlt: string
): ReactNode => {
  if (typeof icon === "string") {
    return <img src={icon} alt={imageAlt} />;
  } else {
    return <>{icon}</>;
  }
};
const renderItem = (
  title: string,
  link: string,
  icon: string | SVGElement | ReactNode,
  imageAlt: string
) => {
  return (
    <>
      {icon && imageAlt && (
        <span className={styles.navItem__icon}>
          {renderIcon(icon, imageAlt)}
        </span>
      )}
      <a href={link} className={styles.navItem__link}>
        {title}
      </a>
    </>
  );
};
export default function NavItem({
  title,
  link,
  icon,
  imageAlt = "image not available",
  isRoot,
}: NavItemType) {
  return isRoot ? (
    <div key={title} className={`${styles.navItem} ${styles.navItem__root}`}>
      {" "}
      {renderItem(title, link, icon, imageAlt)}
    </div>
  ) : (
    <li key={title} className={styles.navItem}>
      {renderItem(title, link, icon, imageAlt)}
    </li>
  );
}
