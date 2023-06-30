import Image from "next/image";
import styles from "../Card.module.scss";

interface Props {
  videoUrl?: string;
  videoAlt?: string;
  content: string;
  cta?: string;
  ctaText?: string;
}
export default function Hero({ videoUrl, content, cta, ctaText }: Props) {
  return (
    <div className={styles.hero}>
      {videoUrl && (
        <div className={styles.hero__videoWrap}>
          <video controls={false} autoPlay muted loop>
            <source src={videoUrl} type="video/mp4" />
          </video>
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
