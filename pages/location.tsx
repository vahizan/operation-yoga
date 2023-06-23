import styles from '../styles/Home.module.scss'
import Link from 'next/link'

export default function Location() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Location</h1>
        <p className={styles.description}>
          <Link href="/">&larr; Go Back</Link>
        </p>
        <p>

          Veda Yogshala is situated on Laxman Jhula Road, Rishikesh, on the banks of the sacred river Ganges. </p>
        <p> Several shops and cafes can be found along the road  – it is a busy hub for fellow yogis seeking respite from busy city life… </p>

      <p> We are also a short walk from the spiritual Parmarth Ashram , which hosts daily Ganga Arti – evening prayers to the river Ganga. </p>
      <img src="/Locationmap.jpg" />
      <p> Veda Yogshala Laxman Jhula Road Rishikesh </p>
      </main>
    </div>
  )
}
