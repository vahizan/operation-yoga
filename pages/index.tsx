import styles from "../styles/Home.module.scss";
import Layout from "../ui/Layout";
import SquareCard from "../ui/SquareCard";
import Hero from "../ui/Hero/Hero";
import RoundCard from "../ui/RoundCard";
import useObserver from "../hooks/observer/useObserver";

export default function Home() {
  const observerCircleImages = useObserver<HTMLDivElement>({
    observerCallback: () => {
      return null;
    },
    options: {
      root: null,
      rootMargin: "0px",
      thresholds: [1.0],
    },
  });

  return (
    <Layout>
      <h1>Welcome to our space</h1>
      <div className={styles.heroContainer}>
        <Hero
          imageSrc={"/Ganga.jpeg"}
          imageAlt={"picture of ganga"}
          content={"Veda Yogshala and Spa"}
          cta={"/schedule"}
          ctaText={"CLICK TO FIND OUT MORE"}
        />
      </div>
      <div
        className={styles.roundCards}
        ref={observerCircleImages.containerRef}
      >
        <RoundCard
          imgSrc={"/IMG-20211010-WA0222.jpeg"}
          imgAlt={"Yoga with everyone and with nature"}
          headingText={"Yoga"}
          headingUrl={"/Yoga"}
        />
        <RoundCard
          imgSrc={"/IMG_20210521_164303.jpeg"}
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
        <SquareCard
          imageSrc={"/drop-in-classes.jpeg"}
          content={"Daily Drop In Classes "}
        />
        <SquareCard
          imageSrc={"/training.jpeg"}
          content={"200 Hour Teachers' Training Course"}
        />
        <SquareCard
          imageSrc={"/IMG_20220821_122707.jpeg"}
          content={"Yoga Retreats"}
        />
      </div>

      <div className={styles.buttonCards}>
        <SquareCard
          imageSrc={"/IMG_20220106_210626.jpeg"}
          content={"Sanskrit Classes"}
        />
        <SquareCard
          imageSrc={"/Foodayurvedic.jpeg"}
          content={"Cooking workshops"}
        />
        <SquareCard
          imageSrc={"/IMG_20210329_181618__01.jpeg"}
          content={"Daily Drop In Meditation"}
        />
      </div>
    </Layout>
  );
}
