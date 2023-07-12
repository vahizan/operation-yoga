import styles from "../Card.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  videoUrl?: string;
  videoAlt?: string;
  content: string;
  cta?: string;
  ctaText?: string;
}

export default function Hero({ videoUrl, content, cta, ctaText }: Props) {
  const [shouldLoadImage, setShouldLoadImage] = useState(true);

  useEffect(() => {
    const networkInformation = navigator.connection as NetworkInformation;
    console.log("networkInformation", networkInformation);
    const effectiveType: string = networkInformation?.effectiveType;
    console.log("EFFECTIVE TYPE", effectiveType);
    if (effectiveType === "4g") {
      setShouldLoadImage(false);
    }
  }, []);

  return (
    <div className={styles.hero}>
      {!shouldLoadImage && videoUrl && (
        <div className={styles.hero__videoWrap}>
          <video controls={false} autoPlay muted loop>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
      {shouldLoadImage && (
        <div className={styles.hero__placeholderImage}>
          <Image
            alt={"picture of the river ganges"}
            src={"/Ganga.jpeg"}
            width={500}
            height={500}
          />
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
