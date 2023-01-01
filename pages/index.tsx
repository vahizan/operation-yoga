import Link from "next/link";
import styles from "../styles/Home.module.scss";
import Layout from "./Layout";
import SquareCard from "../ui/SquareCard";
import Hero from "../ui/Hero/Hero";
import RoundCard from "../ui/RoundCard";

export default function Home() {
  return (
    <Layout>
      <h1>Hello World. Hope you like our website</h1>
      <div className={styles.heroContainer}>
        <Hero
          imageSrc={"/MVIMG_20210102_150104.jpeg"}
          imageAlt={"picture of entrance"}
          content={"GREAT PLANTS WOOHOOHI!"}
          cta={"/home"}
          ctaText={"CLICK TO FIND OUT MORE"}
        />
      </div>
      <div className={styles.roundCards}>
        <RoundCard
          imgSrc={"/spa.jpeg"}
          imgAlt={"Spa Picture"}
          headingText={"Yoga"}
          headingUrl={"/Yoga"}
        />
        <RoundCard
          imgSrc={"/spa.jpeg"}
          imgAlt={"Spa Picture"}
          headingText={"Indian Culture"}
          headingUrl={"/indian-culture"}
        />
        <RoundCard
          imgSrc={"/spa.jpeg"}
          imgAlt={"Spa Picture"}
          headingText={"Ayurveda"}
          headingUrl={"/ayurveda"}
        />
      </div>
      <div className={styles.buttonCards}>
        <SquareCard imageSrc={"/yogaclass2.jpeg"} content={"HELLO"} />
        <SquareCard imageSrc={"/yogaclass2.jpeg"} content={"HELLO SQUARE"} />
      </div>
      <div className={styles.buttonCards}>
        <SquareCard imageSrc={"/yogaclass2.jpeg"} content={"HELLO"} />
        <SquareCard imageSrc={"/yogaclass2.jpeg"} content={"HELLO SQUARE"} />
      </div>
    </Layout>
  );
}
