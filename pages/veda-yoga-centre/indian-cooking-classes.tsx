import Link from "next/link";
import Layout from "../../ui/Layout";
import styles from "./YogaClasses.module.scss";

export default function IndianCookingClasses() {
  return (
    <Layout>
      <div className={styles.grid}>
        <Link href="/" className={styles.card}>
          <h2>Indian Cooking Classes</h2>
          <p>Page for all things indian cooking classes</p>
        </Link>
      </div>
    </Layout>
  );
}
