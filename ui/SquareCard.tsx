import styles from "./Card.module.scss";

interface Props {
    imageSrc?: string;
    content: string;
}
export default function SquareCard({imageSrc, content}: Props) {
    return (
        <div className={styles.card}>
            { imageSrc && <img className={styles.card__image} src={imageSrc} alt={"Bunch of people doing yoga poses"}/>}
            <div className={styles.card__content}>
                {content}
            </div>
            <div className={styles.card__line}/>
        </div>
    );
}