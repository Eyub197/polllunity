"use client"
import Link from "next/link"
import styles from '@/ui/header/header.module.css'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import {usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const Nav = ({ children }:{ children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const manageIsOpen = isOpen ? styles.nav_open : styles.nav_close 
    const isActive = (path:string) : boolean => pathname === path 
    
    
    
    useEffect( ()=> {setIsOpen(false) } , [pathname])

    return(
        <>
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
                        className={`${styles.link} ${isActive("/anketi") && styles.active}`}
                        href="/anketi"
                        >
                         Анкети
                        </Link>
                    </li>
                
                </ul>
                {children}
        </nav>

        <button 
        onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
        className={styles.menu}
        >
            {
                isOpen ? <IoClose /> :  <IoMenu />
            }   
        </button>
        
        </>
        
        
    )
}


export default Nav