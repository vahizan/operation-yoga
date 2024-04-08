import Image from "next/image";
import styles from "./Article.module.scss";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
}

export const Article: FC<Props> = ({
  title,
  heroImageSrc,
  heroImageAlt,
  children,
}) => {
  return (
    <>
      <h1>{title}</h1>
      <main className={styles.container}>
        {heroImageSrc && (
          <div className={styles.container__image}>
            <Image
              width={500}
              height={500}
              alt={heroImageAlt || "hero image"}
              src={heroImageSrc}
            />
          </div>
        )}
        {children}
      </main>
    </>
  );
};

export default Article;
