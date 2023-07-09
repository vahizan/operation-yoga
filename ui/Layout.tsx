import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import styles from "../styles/Layout.module.scss";
import Footer from "./Footer";
import LeftDrawer from "./Navigation/LeftDrawer";
import EnquiryButton from "./Button/EnquiryButton";
import Logo from "../public/logo.svg";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={styles.header}>
        <LeftDrawer />
        <div className={styles.header__content}>
          <div className={styles.header__content__imageContainer}>
            <Image
              className={styles.header__content__imageContainer__yogaAlliance}
              width={70}
              height={70}
              src={"/../public/rys100-yogaalliance.png"}
              alt={"rhys yoga alliance logo"}
            />
            <Image
              width={500}
              height={150}
              priority
              src={Logo}
              alt="Yogshala Logo"
            />
            <Image
              className={styles.header__content__imageContainer__yogaAlliance}
              width={70}
              height={70}
              src={"/../public/yacep-yogaalliance.png"}
              alt={"yacep yoga alliance logo"}
            />
          </div>
          <h1>Veda Yoga Wellness Centre</h1>
        </div>
        <div className={styles.header__enquiry}>
          <EnquiryButton text={"enquire"} url={"/enquire"} />
        </div>
      </div>

      <div className={styles.container}>
        <Head>
          <title>Yoga Time</title>
          <meta name="description" content="Yogshala" />
          <link
            rel="icon"
            href="/Users/vahizanvijayanathan/Desktop/Dev/Personal Projects/operation-yoga/public/favicon.ico"
          />
        </Head>

        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
