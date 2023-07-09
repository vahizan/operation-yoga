import styles from "../styles/Home.module.scss";
import Link from "next/link";
import ProfileBlock from "../ui/ProfileBlock";

export default function Location() {
  const pushpaBlock = [
    " Pushpa Ji is our key to Indian culture here at Veda Yogshala. She\n" +
      "              teaches Hindi courses, Sanskrit, Mantra chanting, Meditation and\n" +
      "              cooking courses, as well as Kundalini yoga.",
    "Pushpa Ji grew up in the small village of Swala, tucked away in\n" +
      "              the mountains of Uttarakhand. Without the opportunity for\n" +
      "              education during her early childhood, Pushpa Ji’s life changed\n" +
      "              when she first came to Rishikesh at the age of 13. Her family\n" +
      "              moved into an ashram and she became thirsty for knowledge. She\n" +
      "              pushed herself to become a strong student and with the support\n" +
      "              from her mentors, she now boasts a Masters degree in English, a\n" +
      "              Bachelor of Education, and a Bachelor’s degree in Hindi and\n" +
      "              Sanskrit. Her journey of learning inspires her to teach from the\n" +
      "              heart, and she is genuinely dedicated to sharing her knowledge\n" +
      "              with others.",
    "   Pushpa Ji is the founder of Veda Yogshala, which has grown from\n" +
      "              being a small, family-run business into a renowned Yoga centre in\n" +
      "              Laxman Jhula, Rishikesh.",
    "   Take the time to get to know Pushpa Ji in any of our cultural\n" +
      "              classes at Veda Yogshala.",
  ];
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Our Teachers</h1>
        <div>
          <ProfileBlock
            title={"Pushpa Ji – Proprietor, Teacher of Culture and Meditation"}
            imageAlt={"Picture of Pushpa Ji"}
            imageUrl={"https://d399a6wtv3gpjg.cloudfront.net/pushpa.png"}
            paragraphs={pushpaBlock}
          />
        </div>
      </main>
    </div>
  );
}
