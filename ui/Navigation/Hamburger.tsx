"use client";

import styles from "./Navigation.module.scss";
import {
  Dispatch,
  FocusEventHandler,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";

interface Props {
  setNavigationOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Hamburger({ setNavigationOpen }: Props) {
  const [isButtonClicked, setButtonClick] = useState(false);

  const clickHandler: MouseEventHandler<HTMLInputElement> = (event) => {
    setButtonClick(!isButtonClicked);
    setNavigationOpen(!isButtonClicked);
  };

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = () => {
    setButtonClick(!isButtonClicked);
    setNavigationOpen(!isButtonClicked);
  };

  return (
    <>
      <input
        onClick={clickHandler}
        onBlur={onBlurHandler}
        type="button"
        id="hamburger-button"
        data-test-id="hamburger-button"
        className={`${isButtonClicked && styles.buttonClicked} ${
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
