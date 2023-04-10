"use client";

import styles from "./Navigation.module.scss";
import {
  Dispatch,
  FocusEventHandler,
  MouseEventHandler,
  SetStateAction,
} from "react";

interface Props {
  setNavigationOpen: Dispatch<SetStateAction<boolean>>;
  isNavigationOpen: boolean;
}

export default function Hamburger({
  setNavigationOpen,
  isNavigationOpen,
}: Props) {
  const clickHandler: MouseEventHandler<HTMLInputElement> = (event) => {
    setNavigationOpen(!isNavigationOpen);
  };

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
    setNavigationOpen(false);
  };

  return (
    <>
      <input
        onClick={clickHandler}
        onBlur={onBlurHandler}
        type="button"
        id="hamburger-button"
        data-test-id="hamburger-button"
        className={`${isNavigationOpen && styles.buttonClicked} ${
          styles.hamburgerButton
        } `}
      />
      <label htmlFor="hamburger-button">
        <div className={`${styles.hamburger}`}>
          <span className={`${styles.bar} ${styles.bar1}`}></span>
          <span className={`${styles.bar} ${styles.bar2}`}></span>
          <span className={`${styles.bar} ${styles.bar3}`}></span>
          <span className={`${styles.bar} ${styles.bar4}`}></span>
          <span className={`${styles.bar} ${styles.bar5}`}></span>
        </div>
      </label>
    </>
  );
}
