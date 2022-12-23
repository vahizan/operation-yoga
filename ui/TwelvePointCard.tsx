import styles from './Card.module.scss';

export default function TwelvePointCard() {
    return (
        <div id={styles.twelvePoint}>
            <img id={styles.twelvePoint} src={"/yogaclass2.jpeg"} alt={"Bunch of people doing yoga poses"}/>
        </div>
    );
}