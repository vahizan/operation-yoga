import styles from '../Card.module.scss';

interface Props {
    imageSrc?: string;
    imageAlt?: string;
    content: string;
}
export default function Hero({imageSrc, content}: Props) {
    return (
        <div className={styles.hero}>
            { imageSrc && <img className={styles.hero__image} src={imageSrc} alt={"Bunch of people doing yoga poses"}/>}
            <div className={styles.hero__content}>
                {content}
            </div>
        </div>
    );
}