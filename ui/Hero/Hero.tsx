import Image from "next/image";
import styles from "../Card.module.scss";

interface Props {
  imageSrc?: string;
  imageAlt?: string;
  content: string;
  cta?: string;
  ctaText?: string;
}
export default function Hero({
  imageSrc,
  imageAlt,
  content,
  cta,
  ctaText,
}: Props) {
  return (
    <div className={styles.hero}>
      {imageSrc && (
        <div className={styles.hero__imageWrap}>
          <Image width={500} height={500} src={imageSrc} alt={imageAlt} />
        </div>
      )}
      <header className={styles.hero__content}>
        <h1>{content}</h1>
        {cta && ctaText && (
          <div className={styles.hero__ctaContainer}>
            <a className={styles.hero__ctaContainer__cta} href={cta}>
              {ctaText}
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
