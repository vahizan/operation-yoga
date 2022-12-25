import styles from '../Card.module.scss';
import {MouseEventHandler} from "react";

interface Props {
    imageSrc?: string;
    imageAlt?: string;
    content: string;
    cta?: string
    ctaText?: string;
}
export default function Hero({imageSrc, content, cta,ctaText}: Props) {
    return (
        <div className={styles.hero}>
            { imageSrc && <div className={styles.hero__imageWrap}><img src={imageSrc} alt={"Bunch of people doing yoga poses"}/></div>}
            <header className={styles.hero__content}>
                <h1>{content}</h1>
                {cta && ctaText && <div className={styles.hero__ctaContainer}><a className={styles.hero__ctaContainer__cta} href={cta}>{ctaText}</a></div>}
            </header>
        </div>
    );
}