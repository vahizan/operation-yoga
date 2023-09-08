import styles from "../Card.module.scss";
import Image from "next/image";
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
  return (
    <div className={styles.hero}>
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
