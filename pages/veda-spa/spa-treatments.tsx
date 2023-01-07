import Link from "next/link";
import Layout from "../Layout";
import styles from "./VedaSpa.module.scss";

export default function SpaTreatments() {
  return (
    <Layout>
      <div className={styles.grid}>
        <h2>Spa Treatments</h2>
        <div className={styles.treatments}>
          <Link href="/veda-spa/treatments/traditional-massage">
            <h2>Traditional Massage &rarr;</h2>
          </Link>
          <Link href="/veda-spa/treatments/thai-yoga-massage">
            <h2>Thai Yoga Massage &rarr;</h2>
          </Link>
          <Link href="/veda-spa/treatments/steam-bath">
            <h2>Steam Bath &rarr;</h2>
          </Link>
          <Link href="/veda-spa/treatments/shirodhara">
            <h2>Shirodhara &rarr;</h2>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
