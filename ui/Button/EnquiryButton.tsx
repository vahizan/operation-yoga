import styles from "../Button.module.scss";
import { FC } from "react";
import Link from "next/link";

interface Props {
  text: string;
  url: string;
}
const EnquiryButton: FC<Props> = ({ text, url }) => {
  return (
    <button className={styles.enquiryButton}>
      <Link href={url}>{text}</Link>
    </button>
  );
};

export default EnquiryButton;
