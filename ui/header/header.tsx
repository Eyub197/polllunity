import Link from "next/link"
import Image from "next/image"
import styles from '@/ui/header/header.module.css'
import NavigationButton from "@/ui/header/navButton/navButton"

const Header = () => {
   
    return(
        <header className={styles.header}>

            <div className={styles.logoContainer}>
            <h3 className={styles.logoText}>Poll <br/>
                Unity</h3>
                <Image 
                className={styles.logo}
                src={"logo.svg"}
                alt="website logo"
                width={50}
                height={46}>
                </Image>
            </div>

            <NavigationButton>
                <ul className={styles.navPageLinks}>
                        <li><Link className={styles.link} href="/">Начаоло</Link></li>
                        <li><Link className={styles.link} href={"/контакти"} >Контакти</Link></li>
                        <li><Link className={styles.link} href={"/анкети"}>Анкети</Link></li>
                        <div>
                            <button className={styles.register}>Регистрирай се</button>
                            <button className={styles.LogIn}>Вход</button>
                        </div>
                </ul>
            </NavigationButton>
        </header>
    )
}

export default Header