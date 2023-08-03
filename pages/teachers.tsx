import styles from "../styles/Home.module.scss";
import ProfileBlock from "../ui/ProfileBlock";
import {
  baldevVisitingInstructor,
  jayBlock,
  jyotiBlock,
  pushpaBlock,
  vivekVisitingInstructor,
} from "../constants/Teachers.constants";
import Layout from "../ui/Layout";

export const Teachers = () => {
  return (
    <Layout>
      <main className={styles.main}>
        <h1>Our Teachers</h1>
        <div>
          <ProfileBlock
            title={"Pushpa Ji – Proprietor, Teacher of Culture and Meditation"}
            imageAlt={"Picture of Pushpa Ji"}
            imageUrl={"https://d399a6wtv3gpjg.cloudfront.net/pushpa.png"}
            paragraphs={pushpaBlock}
          />
          <ProfileBlock
            title={
              "Jay Ji – Proprietor, Teacher of Yoga, Pranayama and Meditiation"
            }
            imageAlt={"Picture of Jay Ji"}
            imageUrl={"https://d399a6wtv3gpjg.cloudfront.net/jayji.png"}
            paragraphs={jayBlock}
          />
          <ProfileBlock
            title={"Jyoti Ji – Teacher of Culture"}
            imageAlt={"Picture of Jyoti Ji"}
            imageUrl={"https://d399a6wtv3gpjg.cloudfront.net/jyotiji.png"}
            paragraphs={jyotiBlock}
          />
          <h3>Visiting Teachers</h3>
          <ProfileBlock
            title={"Vivek Bijlawan Ji – Yoga Instructor"}
            paragraphs={vivekVisitingInstructor}
          />
          <ProfileBlock
            title={"Baldev (Bunny) Ji"}
            paragraphs={baldevVisitingInstructor}
          />
        </div>
      </main>
    </Layout>
  );
};

export default Teachers;
