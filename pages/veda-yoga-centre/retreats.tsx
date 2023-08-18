import Link from "next/link";
import Layout from "../../ui/Layout";
import styles from "./YogaClasses.module.scss";

export default function Retreats() {
  return (
    <Layout>
      <div className={styles.grid}>
        <Link href="/" className={styles.card}>
          <h2>Retreats</h2>
          <p>Page for all things retreats</p>
        </Link>
      </div>
    </Layout>
  );
}
