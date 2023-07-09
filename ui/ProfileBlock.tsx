import { FC } from "react";
import Image from "next/image";
import styles from "./ProfileBlock.module.scss";

interface Props {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  paragraphs: string[];
}

const ProfileBlock: FC<Props> = ({ title, imageUrl, imageAlt, paragraphs }) => {
  return (
    <div className={styles.profileBlock}>
      <div className={styles.profileBlock__hero}>
        <h3>{title}</h3>
        {imageUrl && (
          <Image
            className={styles.profileBlock__image}
            width={500}
            height={500}
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
