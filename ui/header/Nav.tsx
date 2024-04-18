"use client"

import Link from "next/link"
import styles from '@/ui/header/Header.module.css'
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import {usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { NavProps } from "@/lib/types";

const Nav = ({ children, currentUserRole  } : NavProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const manageIsOpen = isOpen ? styles.nav_open : styles.nav_close 
    const isActive = (path:string) : boolean => pathname === path
    
   
    const [isAdminActive, setIsAdminActive] = useState(false)
    
    useEffect( ()=> { setIsOpen(false) } , [pathname])
     useEffect( () => {setIsAdminActive(currentUserRole === "admin")}, [currentUserRole] )  

    return(
        <>
            <nav className={`${styles.nav}  ${manageIsOpen}`}>
                <ul className={styles.nav_links_container}>
                    <li>
                        <Link 
                        className={`${styles.link} ${isActive("/") && `${styles.active}`}`} 
                        href="/"
                        >
                        Начало
                        </Link>
                    </li>
                    <li>
                        <Link 
                        className={`${styles.link} ${pathname.startsWith("/anketi") && `${styles.active}`}`}
                        href="/anketi"
                        >
                        Анкети
                        </Link>
                    </li>
                    <li>
                        {
                        isAdminActive &&
                            <Link 
                            href="/admin"
                            className={`${styles.admin_link}  ${pathname.startsWith("/admin") && styles.admin_link_active}`}
                            >
                            Админ        
                            </Link>
                        }
                    </li>
                </ul>
                {children}
            </nav>

            <button 
            onClick={ () => setIsOpen(prevIsOpen => !prevIsOpen) }
            className={styles.menu}
            >
                { isOpen ? <IoClose /> :  <IoMenu />}   
            </button>
        </>
    )
}


export default Nav