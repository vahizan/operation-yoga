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
      <h3>{title}</h3>
      {imageUrl && <Image alt={imageAlt || ""} src={imageUrl} />}
      <div className={styles.profileBlock__paragraphs}>
        {paragraphs.map((paragraph) => (
          <p>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ProfileBlock;
