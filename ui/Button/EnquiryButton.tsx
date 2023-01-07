import styles from "../Button.module.scss";

export default function EnquiryButton({ text }: { text: string }) {
  return <button className={styles.enquiryButton}>{text}</button>;
}
