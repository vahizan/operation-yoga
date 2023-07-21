import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import styles from "../styles/Layout.module.scss";
import Footer from "./Footer";
import LeftDrawer from "./Navigation/LeftDrawer";
import EnquiryButton from "./Button/EnquiryButton";
import Link from "next/link";
import YogshalaFancyLogo from "./YogshalaFancyLogo";
import Certification from "./Certfication";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Yoga Time</title>
        <meta name="description" content="Yogshala" />
        <link
          rel="icon"
          href="/Users/vahizanvijayanathan/Desktop/Dev/Personal Projects/operation-yoga/public/favicon.ico"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <LeftDrawer />
          <div className={styles.header__certification}>
            <Certification />
          </div>
          <div className={styles.header__content}>
            <Link href={"/"}>
              <YogshalaFancyLogo />
            </Link>
            <h1>{"VEDA YOGA WELLNESS CENTRE"}</h1>
            <div className={styles.header__content__certification}>
              <Certification />
            </div>
          </div>
          <div className={styles.header__enquiry}>
            <EnquiryButton text={"enquire"} url={"/enquire"} />
          </div>
        </div>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
