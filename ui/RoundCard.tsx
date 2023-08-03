import Image from "next/image";
import styles from "./Card.module.scss";

interface Props {
  imgSrc: string;
  imgAlt: string;
  headingText: string;
  headingUrl: string;
  className?: string;
}

export default function RoundCard({
  imgSrc,
  imgAlt,
  headingText,
  headingUrl,
  className,
}: Props) {
  const mainClassName = className
    ? `${styles.roundCard} ${className}`
    : styles.roundCard;
  return (
    <div className={mainClassName}>
      <h1>
        <a className={styles.roundCard__text} href={headingUrl}>
          {headingText}
        </a>
      </h1>
      <Image width={500} height={500} src={imgSrc} alt={imgAlt} />
    </div>
  );
}
