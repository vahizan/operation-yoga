
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import Layout from "./Layout";
import SquareCard from "../ui/SquareCard";
import Hero from "../ui/Hero/Hero";


export default function Home() {
  return (
    <Layout>
        <h1>Hello World. Hope you like our website</h1>
        <div className={styles.heroContainer}>
            <Hero imageSrc={"/MVIMG_20210102_150104.jpeg"} imageAlt={"picture of entrance"} content={"GREAT PLANTS WOOHOO!"}/>
        </div>
        <div className={styles.buttonCards}>
            <SquareCard imageSrc={"/yogaclass2.jpeg"} content={"HELLO"}/>
            <SquareCard imageSrc={"/yogaclass2.jpeg"} content={"HELLO SQUARE"}/>
        </div>
        <div className={styles.buttonCards}>
            <SquareCard imageSrc={"/yogaclass2.jpeg"} content={"HELLO"}/>
            <SquareCard imageSrc={"/yogaclass2.jpeg"} content={"HELLO SQUARE"}/>
        </div>
    </Layout>

  )
}
