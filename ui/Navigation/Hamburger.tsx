import styles from "./Navigation.module.scss";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

interface Props {
  updateValue: Dispatch<SetStateAction<boolean>>;
}
export default function Hamburger({ updateValue }: Props) {
  const checkboxEvent: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateValue(event.currentTarget.checked);
  };
  return (
    <>
      <input
        onChange={checkboxEvent}
        type="checkbox"
        id="checkbox"
        className={`${styles.checkbox} ${styles.hidden}`}
      />
      <label htmlFor="checkbox">
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
