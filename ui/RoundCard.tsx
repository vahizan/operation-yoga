import styles from "./Card.module.scss";

interface Props {
  imgSrc: string;
  imgAlt: string;
  headingText: string;
  headingUrl: string;
}

export default function RoundCard({
  imgSrc,
  imgAlt,
  headingText,
  headingUrl,
}: Props) {
  return (
    <div className={styles.roundCard}>
      <h1>
        <a className={styles.roundCard__text} href={headingUrl}>
          {headingText}
        </a>
      </h1>
      <img src={imgSrc} alt={imgAlt} />
    </div>
  );
}
