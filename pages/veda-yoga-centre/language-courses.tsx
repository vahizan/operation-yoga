import Link from "next/link";
import Layout from "../../ui/Layout";
import styles from "./YogaClasses.module.scss";

export default function LanguageCourses() {
  return (
    <Layout>
      <div className={styles.grid}>
        <Link href="/" className={styles.card}>
          <h2>Language Courses</h2>
          <p>Page for all things language courses</p>
        </Link>
      </div>
    </Layout>
  );
}
