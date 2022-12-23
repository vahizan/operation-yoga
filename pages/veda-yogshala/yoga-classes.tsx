import Link from 'next/link'
import Layout from "../Layout";
import styles from './YogaClasses.module.scss';


export default function YogaClasses() {
    return (
        <Layout>
            <div className={styles.grid}>
                <Link href="/" className={styles.card}>
                    <h2>Yoga Classes &rarr;</h2>
                    <p>Page for all things yoga classes</p>
                </Link>
            </div>
        </Layout>
    )
}
