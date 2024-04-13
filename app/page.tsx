import Image from "next/image"
import landingImage from "@/public/landingImage.webp"
import styles from "./page.module.css"
import Benefits from "@/ui/components/framerMotion/Benefits"
export default async function Home() {
  
  return (
  <main className={styles.main}>
    <section className={styles.introduction}>
    <h1 className={styles.landing_title}>
        Добре дошли в <span className={styles.name}>PollUnity
        </span> вашия нов <span className={styles.friend}>приятел</span>  в създаването на анкети
    </h1>
    <Image 
     src={landingImage} 
     alt="Logo"
     className={styles.image}
     />    
    </section>
    <h2>Защо да изберете PollUnity</h2>
    <Benefits/>
  </main>

  )
}

