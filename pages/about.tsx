import Image from "next/image";
import styles from "./about.module.scss";
import Layout from "../ui/Layout";

export default function About() {
  return (
    <Layout>
      <h1>About Us</h1>
      <main className={styles.container}>
        <div className={styles.container__image}>
          <Image
            width={500}
            height={500}
            alt={"Two yoga instructors welcoming you"}
            src={"https://d399a6wtv3gpjg.cloudfront.net/Vedashala2.jpeg"}
          />
        </div>
        <p className={styles.description}>
          Veda Yogashala started as a venture initiated by the current
          proprietors, Jay Bhatt and Pushpa together with family members and
          friends. Located in the Yoga capital of the world, Rishikesh, Veda
          Yogashala was started with the aim of bringing traditional yoga
          practice into our teaching, sharing the knowledge and skills from our
          ancient tradition with the learners of today. The centre now includes
          a Spa where traditional and ayurvedic massages are provided.
        </p>
        <p className={styles.description}>
          A variety of Yoga forms are taught at the centre, all based on ancient
          knowledge of Sanskrit culture: this includes Hatha Yoga, Hatha Flow,
          Ashtanga Vinyasa and Kundalini yoga. In addition to asana practice, we
          also teach Pranayama and Meditation.
        </p>
        <p>
          Our centre is visited by so many people from all parts of the world,
          and so we also provide Hindi language classes, Sanskrit language
          classes, Mantra chanting, and Ayurvedic cooking experience to ensure
          that our visitors have a well-rounded experience of our culture. Our
          classes are delivered in English, and whether it is yoga or language,
          we ensure that everyone finds the activities challenging physically
          and mentally, but with the maximum amount of care and assistance.
        </p>
      </main>
    </Layout>
  );
}
