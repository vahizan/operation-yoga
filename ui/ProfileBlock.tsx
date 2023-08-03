import { FC, useState } from "react";
import Image from "next/image";
import styles from "./ProfileBlock.module.scss";
import { SocialMedia } from "../pages/types";
import useObserver from "../hooks/observer/useObserver";

interface Props {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  paragraphs: string[];
  socialMedia?: SocialMedia[];
}

const ProfileBlock: FC<Props> = ({
  title,
  imageUrl,
  imageAlt,
  paragraphs,
  socialMedia,
}) => {
  const [isIntersecting, setIntersecting] = useState<boolean>();
  const observer = useObserver<HTMLDivElement>({
    observerCallback: (entries) => {
      setIntersecting(entries[0].isIntersecting);
    },
    options: {
      root: null,
      rootMargin: "0px",
      thresholds: [1.0],
    },
  });
  return (
    <div
      ref={observer.containerRef}
      className={
        isIntersecting ? styles.profileBlock : styles.profileBlock__hidden
      }
    >
      <div className={styles.profileBlock__hero}>
        <h3>{title}</h3>
        {imageUrl && isIntersecting && (
          <Image
            className={styles.profileBlock__image}
            width={300}
            height={300}
            alt={imageAlt || ""}
            src={imageUrl}
          />
        )}
      </div>
      <div className={styles.profileBlock__paragraphs}>
        {paragraphs.map((paragraph) => (
          <p>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ProfileBlock;
