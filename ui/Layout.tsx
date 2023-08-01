import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import styles from "../styles/Layout.module.scss";
import Footer from "./Footer";
import LeftDrawer from "./Navigation/LeftDrawer";
import NavigationButton from "./Button/NavigationButton";
import Link from "next/link";
import YogshalaFancyLogo from "./YogshalaFancyLogo";
import Certification from "./Certfication";
import { useSession } from "next-auth/react";
import AccountIcon from "public/account-icon.svg";
import MainLogo from "../public/logo-only.svg";

const AUTHENTICATED = "authenticated";

export default function Layout({ children }: { children: ReactNode }) {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { status, data } = useSession();
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
        <div
          className={`${
            isAtTop
              ? styles.header
              : `${styles.header} ${styles.header__scroll}`
          }`}
        >
          <LeftDrawer />
          <div className={styles.header__certification}>
            <Certification />
          </div>
          <div className={styles.header__content}>
            <Link href={"/"}>
              {isAtTop ? (
                <YogshalaFancyLogo />
              ) : (
                <div className={styles.header__content__mainLogo}>
                  <MainLogo />
                </div>
              )}
            </Link>
            <div
              className={
                isAtTop
                  ? styles.header__content__certification
                  : styles.header__content__certification__hidden
              }
            >
              <Certification />
            </div>
            <h1
              className={
                isAtTop
                  ? styles.header__content__title
                  : styles.header__content__title__hidden
              }
            >
              {"VEDA YOGA WELLNESS CENTRE"}
            </h1>
          </div>
          <div className={styles.header__rightContent}>
            <NavigationButton text={"enquire"} url={"/enquire"} />
            {status === AUTHENTICATED ? (
              <>
                <div className={styles.header__rightContent__accountContainer}>
                  <div
                    className={
                      styles.header__rightContent__accountContainer__button
                    }
                  >
                    <NavigationButton text={"Account"} url={"/account"} />
                  </div>

                  <button
                    className={
                      styles.header__rightContent__accountContainer__iconButton
                    }
                  >
                    <Link href={"/account"}>
                      <AccountIcon />
                    </Link>
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.header__rightContent__loginContainer}>
                <NavigationButton text={"Login"} url={"/login"} />
              </div>
            )}
          </div>
        </div>

        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
