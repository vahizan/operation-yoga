import styles from "../Button.module.scss";
import { FC } from "react";
import Link from "next/link";

interface Props {
  text: string;
  url: string;
}
const NavigationButton: FC<Props> = ({ text, url }) => {
  return (
    <button className={styles.navigationButton}>
      <Link href={url}>{text}</Link>
    </button>
  );
};

export default NavigationButton;
