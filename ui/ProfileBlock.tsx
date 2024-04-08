import { FC, useState } from "react";
import Image from "next/image";
import styles from "./ProfileBlock.module.scss";
import { Platform, SocialMedia } from "../types/SocialMediaTypes";
import useObserver from "../hooks/observer/useObserver";
import FacebookIcon from "../public/facebook-icon.svg";
import InstagramIcon from "../public/instagram-icon.svg";
import YoutubeIcon from "../public/youtube-icon.svg";
import Twitter from "../public/twitter-icon.svg";
import Link from "next/link";

interface Props {
  title: string;
  imageUrl?: string;
  imageAlt?: string;
  paragraphs: string[];
  socialMedia?: SocialMedia[];
}
const socialMediaIcon = (socialMedia: Platform) => {
  switch (socialMedia) {
    case Platform.FACEBOOK:
      return <FacebookIcon />;
    case Platform.INSTAGRAM:
      return <InstagramIcon />;
    case Platform.YOUTUBE:
      return <YoutubeIcon />;
    case Platform.TWITTER:
      return <div>𝕏</div>;
    default:
      return <div>?</div>;
  }
};

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
        {socialMedia && (
          <div className={styles.profileBlock__socialMediaLinks}>
            {socialMedia.map((social) => {
              return (
                <Link
                  className={styles.profileBlock__socialMediaLinks__link}
                  href={social.url}
                >
                  {socialMediaIcon(social.platform)}
                </Link>
              );
            })}
          </div>
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
