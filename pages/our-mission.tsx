import Layout from "../ui/Layout";
import Image from "next/image";

export const OurMission = () => {
  return (
    <Layout>
      <h1>Our Mission</h1>
      <Image
        width={500}
        height={300}
        src={"https://d399a6wtv3gpjg.cloudfront.net/mymission-photo.jpeg"}
        alt={"yoga instructor doing splits"}
      />
      <div className={"content"}>
        <p>
          The Mission of Veda Yogshala is to share the eternal wisdom,
          knowledge, and philosophy of yoga, which has been passed through the
          ancient yogic traditions.
        </p>
        <p>
          We believe that traditional Yoga should be taught comprehensively. The
          courses are designed according to the student’s experience and
          ability, but embedded in the traditional knowledge which should be
          passed on, as we believe that with the right approach, students can
          benefit the most and further enhance their lives.
        </p>
        <p>
          Veda Spa is also steeped in Indian tradition and Ayurvedic philosophy,
          together with a contemporary approach. The Spa offers a range of
          treatments as well as health consultations to offer a revitalised path
          of health and wellbeing.
        </p>
      </div>
    </Layout>
  );
};

export default OurMission;
