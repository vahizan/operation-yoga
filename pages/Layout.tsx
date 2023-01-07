import Head from "next/head";
import styles from "../styles/Layout.module.scss";
import Footer from "./Footer";
import LeftDrawer from "../ui/Navigation/LeftDrawer";
import EnquiryButton from "../ui/Button/EnquiryButton";

export default function Layout({ children }) {
  return (
    <>
      <div className={styles.header}>
        <LeftDrawer />
        <div className={styles.header__enquiry}>
          <EnquiryButton text={"enquire"} />
        </div>
      </div>

      <div className={styles.container}>
        <Head>
          <title>Yoga Time</title>
          <meta name="description" content="Yogshala" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
