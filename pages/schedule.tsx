import styles from "../styles/Schedule.module.scss";
import PriceList from "../ui/PriceList";
import { usePackages } from "../hooks/lesson/usePackages";
import Layout from "../ui/Layout";

export default function Schedule() {
  const { packages, apiErrorMessage, apiLoading } = usePackages(1, 30);
  return (
    <Layout>
      <div className={styles.scheduleContainer}>
        <h1>Schedule</h1>

        <main className={styles.prices}>
          {apiErrorMessage && !apiLoading && (
            <div>Error retrieving packages, please try again later</div>
          )}
          {packages && !apiErrorMessage && !apiLoading && (
            <PriceList packages={packages} />
          )}
          {apiLoading && <div>Getting all available packages</div>}
        </main>
      </div>
    </Layout>
  );
}
