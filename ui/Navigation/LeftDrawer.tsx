"use client";

import styles from "./Navigation.module.scss";
import Hamburger from "./Hamburger";
import { NavMenuType } from "./types";
import { NAVIGATION_MENU_VALUES } from "../../constants/Navigation.constants";
import VerticalNavMenu from "./VerticalNavMenu";
import {
  Dispatch,
  FocusEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { set } from "immutable";

const renderNavItems = (navMenuItems: NavMenuType[]): JSX.Element[] | null => {
  if (!navMenuItems) {
    return null;
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

const blurEvent =
  (
    setBlur: Dispatch<SetStateAction<boolean>>
  ): FocusEventHandler<HTMLInputElement> =>
  () => {
    setBlur(true);
    console.log("setBlur in left drawer");
  };

export default function LeftDrawer() {
  const [isChecked, setChecked] = useState(false);
  const [isBlurred, setBlurred] = useState(false);

  useEffect(() => {
    if (isBlurred) {
      console.log("isBlurred leftDrawer", isBlurred);
      setChecked(false);
    }
  }, [isBlurred, setChecked]);

  return (
    <div onBlur={blurEvent(setBlurred)}>
      <div className={styles.leftDrawer__hamburger}>
        <Hamburger setNavigationOpen={setChecked} />
      </div>

      <div
        data-test-id="drawer"
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
