import EnquiryForm from "../ui/Form/EnquiryForm";
import styles from "./enquire.module.scss";
import Layout from "../ui/Layout";

export const Enquire = () => {
  return (
    <Layout>
      <main className={styles.enquireContainer}>
        <h1>Submit an Enquiry</h1>
        <EnquiryForm />
      </main>
    </Layout>
  );
};

export default Enquire;
