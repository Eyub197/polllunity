"use client"
import Link from "next/link"
import styles from '@/ui/header/header.module.css'
import Logo from "../logo"
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import {usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const Header = () => {
   const [isOpen, setIsOpen] = useState(false)
   const pathname = usePathname()
   const manageIsOpen = isOpen ? styles.nav_open : styles.nav_close 
   const isActive = (path:string) : boolean => pathname === path 
   const redirect = 
    
    useEffect( ()=> { setIsOpen(false) } , [pathname])

    return(
        <header className={styles.header}>
           <Logo  />
            <nav className={`${styles.nav}  ${manageIsOpen}`}>
            <ul className={styles.nav_links_container}>
                    <li>
                        <Link 
                        className={`${styles.link} ${isActive("/") && styles.active}`} 
                        href="/">Начаоло
                        </Link>
                    </li>
                    <li>
                        <Link 
                        className={`${styles.link} ${isActive("/co") && styles.active}`} 
                        href="/co">Контакти</Link>
                    </li>
                    <li>
                        <Link 
                        className={`${styles.link} ${isActive("/анкети") && styles.active}`}
                        href="/анкети"
                        >
                         Анкети
                        </Link>
                    </li>
                
                </ul>
                <div className={styles.buttons_container}>
                    <button className={styles.register}> <Link href="/register"> Регистрирай се</Link></button>
                    <button className={styles.login}><Link href="/sign-in"> Вход </Link></button>
                </div>
            </nav>
            
            <button 
                onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
                className={styles.menu}
                >
                    {
                        isOpen ? <IoClose /> :  <IoMenu />
                    }   
            </button>
        </header>
    )
}

export default Header