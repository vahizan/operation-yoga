import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Layout from "../ui/Layout";
import SquareCard from "../ui/SquareCard";
import Hero from "../ui/Hero/Hero";
import RoundCard from "../ui/RoundCard";
import useObserver from "../hooks/observer/useObserver";
import ArrowBranchLeft from "public/arrow-branch-left.svg";
import ArrowBranchRight from "public/arrow-branch-right.svg";

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
      <main>
        <div className={styles.heroContainer}>
          <Hero
            desktopVideoUrl={
              "https://d399a6wtv3gpjg.cloudfront.net/hero-video-desktop.mp4"
            }
            mobileVideoUrl={
              "https://d399a6wtv3gpjg.cloudfront.net/hero-video-mobile.mp4"
            }
            videoAlt={"instructor teaching yoga by the ganges"}
            content={"Veda Yogshala and Spa"}
            cta={"/schedule"}
          />
        </div>
        <h1 className={styles.secondTitle}>
          Veda <span>Yoga</span> <span>Centre</span>
        </h1>
        <div className={styles.branches}>
          <div className={styles.branches__branchLeft}>
            <ArrowBranchLeft />
            <div className={styles.branches__branchLeft__content}>
              Veda <span> Yogshala </span>
            </div>
          </div>
          <div className={styles.branches__branchRight}>
            <ArrowBranchRight />
            <div className={styles.branches__branchRight__content}>
              Veda <span> Spa </span>
            </div>
          </div>
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
            className={styles.roundCards__indianCulture}
            imgSrc={"https://d399a6wtv3gpjg.cloudfront.net/Indian+culture.jpeg"}
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
            isUnavailable={true}
            unavailableReason={"Under Construction"}
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
            content={"Hindi and Sanskrit Classes"}
          />
          <SquareCard
            imageSrc={"/Foodayurvedic.jpeg"}
            content={"Cooking workshops"}
          />
          <SquareCard
            imageSrc={"/IMG_20210329_181618__01.jpeg"}
            content={"Ayurveda and Spa"}
          />
        </div>
      </main>
    </Layout>
  );
}
