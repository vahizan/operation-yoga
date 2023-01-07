"use client";

import styles from "./Navigation.module.scss";
import Hamburger from "./Hamburger";
import { NavMenuType } from "./types";
import { NAVIGATION_MENU_VALUES } from "../../constants/Navigation.constants";
import VerticalNavMenu from "./VerticalNavMenu";
import { useState } from "react";

const renderNavItems = (navMenuItems: NavMenuType[]) => {
  if (!navMenuItems) {
    return;
  }
  return navMenuItems.map((navMenu, i) => {
    return (
      <VerticalNavMenu
        root={navMenu.root}
        children={navMenu.children}
        key={`${navMenu.root.title}_${i}`}
      />
    );
  });
};

export default function LeftDrawer() {
  const [isChecked, setChecked] = useState(false);
  return (
    <div className={styles.leftDrawer}>
      <div className={styles.leftDrawer__hamburger}>
        <Hamburger updateValue={setChecked} />
      </div>

      <div
        className={`${styles.leftDrawer__content}
          ${
            isChecked
              ? styles.leftDrawer__content__show
              : styles.leftDrawer__content__hide
          }
            `}
      >
        {renderNavItems(NAVIGATION_MENU_VALUES)}
      </div>
    </div>
  );
}
