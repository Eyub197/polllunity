import Link from "next/link"
import Image from "next/image"
import styles from '@/ui/header/header.module.css'

const Header = () => {
    return(
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Image 
                className={styles.logo}
                src={"logo.svg"}
                alt="website logo"
                width={72}
                height={62}>
                </Image>
                <h3>PollUnity</h3>
            </div>
            <nav>
            <ul className={styles.nav}>
                    <li>Начаоло</li>
                    <li>Контакти</li>
                    <li>Анкети</li>
                </ul>
            </nav>
           <div>
            <button>Регистрирай се</button>
            <button>Вход</button>
           </div>
        </header>
    )
}

export default Header