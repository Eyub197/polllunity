import Image from "next/image"
import landingImage from "@/public/landingImage.webp"
import styles from "./page.module.css"
import Benefits from "@/ui/components/framerMotion/Benefits"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa";

export default async function Home() {
  
  return (
  <>
  <main className={styles.main}>
    <section className={styles.hero}>
    <div className={styles.text}>
      <h1 className={styles.hero_title}>„Отприщи силата на обратната връзка!“ </h1>  
      <p className={styles.hero_text}>
      <span className="b">Ангажирайте се</span>,<span className="b"> откривайте </span> и  <span className="b">действайте</span> с най-добрия инструмент за динамични анкети.
      Присъединете се сега, за да отключите пълния потенциал на незабавната обратна връзка.
      </p>
    <Link 
    className={styles.hero_btn}
    href="/registraciq">Регистрирай се <FaArrowRight className={styles.hero_icon}/> </Link>
    </div>
    <Image 
     priority
     src={landingImage} 
     alt="снимка на хора поставящи анкети в кутия"
     className={styles.image}
     />    
    </section>
    <h2 className={styles.question}>Защо да изберете PollUnity<span className={styles.question_mark}>?</span></h2>
    <Benefits/>
  </main>
  <footer className={styles.footer}>
    <small>Всички права резервирани@{new Date().getFullYear()}</small>
  </footer>  
  </>

  )
}

