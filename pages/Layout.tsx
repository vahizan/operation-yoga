import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Footer from "./Footer";
import Navigation from "../ui/Navigation";
import LeftDrawer from "../ui/Navigation/LeftDrawer";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yoga Time</title>
        <meta name="description" content="Yogshala" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LeftDrawer />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
