import Image from "next/image";
import styles from "./Card.module.scss";

interface Props {
  imageSrc?: string;
  content: string;
  isUnavailable?: boolean;
  unavailableReason?: string;
}
export default function SquareCard({
  imageSrc,
  content,
  isUnavailable,
  unavailableReason,
}: Props) {
  return (
    <>
      <div
        className={`${styles.card} ${
          isUnavailable && styles.card__unavailable
        }`}
      >
        {imageSrc && (
          <Image
            className={styles.card__image}
            src={imageSrc}
            width={700}
            height={700}
            alt={"Bunch of people doing yoga poses"}
          />
        )}
        <div className={styles.card__content}>{content}</div>
      </div>
      {isUnavailable && unavailableReason && (
        <div className={styles.unavailableReason}>{unavailableReason}</div>
      )}
    </>
  );
}
