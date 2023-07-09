import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Layout from "../ui/Layout";

export default function Location() {
  return (
    <Layout>
      <h1>Location</h1>
      <main className={styles.container}>
        <p>
          Veda Yogshala is situated on Laxman Jhula Road, Rishikesh, on the
          banks of the sacred river Ganges.{" "}
        </p>
        <p>
          Several shops and cafes can be found along the road – it is a busy hub
          for fellow yogis seeking respite from busy city life…{" "}
        </p>

        <p>
          We are also a short walk from the spiritual Parmarth Ashram , which
          hosts daily Ganga Arti – evening prayers to the river Ganga.{" "}
        </p>
        <img src="/Locationmap.jpeg" />
        <p> Veda Yogshala Laxman Jhula Road Rishikesh </p>
      </main>
    </Layout>
  );
}
