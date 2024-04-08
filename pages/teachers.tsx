import styles from "../styles/teachers.module.scss";
import ProfileBlock from "../ui/ProfileBlock";
import {
  baldevVisitingInstructor,
  jayBlock,
  jyotiBlock,
  pushpaBlock,
  vivekVisitingInstructor,
} from "../constants/Teachers.constants";
import Layout from "../ui/Layout";
import { Platform } from "../types/SocialMediaTypes";

export const Teachers = () => {
  return (
    <Layout>
      <main>
        <h1>Our Teachers</h1>
        <div>
          <ProfileBlock
            title={"Pushpa Ji – Proprietor, Teacher of Culture and Meditation"}
            imageAlt={"Picture of Pushpa Ji"}
            imageUrl={"https://d399a6wtv3gpjg.cloudfront.net/pushpa.png"}
            socialMedia={[
              {
                platform: Platform.INSTAGRAM,
                url: "https://instagram.com/pushpa_hindi_language_school?igshid=Y2IzZGU1MTFhOQ==",
              },
              {
                platform: Platform.FACEBOOK,
                url: "https://www.facebook.com/pushpa.bhatt.39?mibextid=LQQJ4d",
              },
            ]}
            paragraphs={pushpaBlock}
          />
          <ProfileBlock
            title={
              "Jay Ji – Proprietor, Teacher of Yoga, Pranayama and Meditiation"
            }
            imageAlt={"Picture of Jay Ji"}
            imageUrl={"https://d399a6wtv3gpjg.cloudfront.net/jayji.png"}
            socialMedia={[
              {
                platform: Platform.INSTAGRAM,
                url: "https://instagram.com/rishikeshyoga_jay?igshid=NTc4MTIwNjQ2YQ==",
              },
              {
                platform: Platform.FACEBOOK,
                url: "https://www.facebook.com/jayprakash.bhatt.794?mibextid=LQQJ4d",
              },
            ]}
            paragraphs={jayBlock}
          />
          <ProfileBlock
            title={"Jyoti Ji – Teacher of Culture"}
            imageAlt={"Picture of Jyoti Ji"}
            imageUrl={"https://d399a6wtv3gpjg.cloudfront.net/jyotiji.png"}
            socialMedia={[
              {
                platform: Platform.INSTAGRAM,
                url: "https://instagram.com/jyotibhatt144?igshid=Y2IzZGU1MTFhOQ==",
              },
            ]}
            paragraphs={jyotiBlock}
          />
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
