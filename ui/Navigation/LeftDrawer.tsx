"use client";

import styles from "./Navigation.module.scss";
import Hamburger from "./Hamburger";
import { NavMenuType } from "../../types/NavigationTypes";
import { NAVIGATION_MENU_VALUES } from "../../constants/Navigation.constants";
import VerticalNavMenu from "./VerticalNavMenu";
import {
  Dispatch,
  FocusEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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
  };

export default function LeftDrawer() {
  const [isOpen, setOpen] = useState(false);
  const [isBlurred, setBlurred] = useState(false);
  const drawerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (isOpen) {
      drawerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isBlurred) {
      setOpen(false);
    }
  }, [isBlurred, setOpen]);

  return (
    <div onBlur={blurEvent(setBlurred)}>
      <div className={styles.leftDrawer__hamburger}>
        <Hamburger setNavigationOpen={setOpen} isNavigationOpen={isOpen} />
      </div>
      <div
        data-test-id="drawer"
        className={`${styles.leftDrawer__content}
          ${
            isOpen
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
