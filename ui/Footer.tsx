import styles from "../styles/Layout.module.scss";
import FacebookIcon from "public/facebook-icon.svg";
import YoutubeIcon from "public/youtube-icon.svg";
import InstagramIcon from "public/instagram-icon.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__links}>
        <div>FAQs</div>
        <div>About Us</div>
        <div>Contact Us</div>
      </div>
      <div className={styles.footer__socialMediaLinks}>
        <Link href={""}>
          <FacebookIcon />
        </Link>
        <Link href={""}>
          <YoutubeIcon />
        </Link>
        <Link href={""}>
          <InstagramIcon />
        </Link>
        <Link href="" className={styles.footer__socialMediaLinks__twitter}>
          𝕏
        </Link>
      </div>
    </footer>
  );
}
