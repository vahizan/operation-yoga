import styles from "../Card.module.scss";
import { useEffect, useState } from "react";

interface Props {
  desktopVideoUrl: string;
  mobileVideoUrl: string;
  videoAlt?: string;
  content: string;
  cta?: string;
  ctaText?: string;
}

export default function Hero({
  desktopVideoUrl,
  mobileVideoUrl,
  content,
  cta,
  ctaText,
}: Props) {
  const [shouldLoadImage, setShouldLoadImage] = useState(true);

  useEffect(() => {
    const networkInformation = navigator.connection as NetworkInformation & {
      effectiveType?: string;
    };
    if (
      networkInformation?.effectiveType === "4g" ||
      networkInformation?.type === "wifi"
    ) {
      setShouldLoadImage(false);
    }
  }, []);

  return (
    <div className={styles.hero}>
      {!shouldLoadImage && (
        <div className={styles.hero__videoWrap}>
          <video
            className={styles.hero__videoWrap__desktop}
            controls={false}
            autoPlay
            muted
            loop
          >
            <source src={desktopVideoUrl} type="video/mp4" />
          </video>
          <video
            className={styles.hero__videoWrap__mobile}
            controls={false}
            autoPlay
            muted
            loop
          >
            <source src={mobileVideoUrl} type="video/mp4" />
          </video>
        </div>
      )}
      {shouldLoadImage && (
        <>
          <video
            className={styles.hero__videoWrap__desktop}
            controls={true}
            autoPlay={false}
            muted
            loop
          >
            <source src={desktopVideoUrl} type="video/mp4" />
          </video>
          <video
            className={styles.hero__videoWrap__mobile}
            autoPlay={false}
            controls
            muted
            loop
          >
            <source src={mobileVideoUrl} type="video/mp4" />
          </video>
        </>
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
