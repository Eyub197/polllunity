"use client"

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import styles from "@/ui/header/navButton/navButton.module.css"

const NavigationButton = ({ children }:{ children: React.ReactNode}) => {
    
    const [isOpen, setIsOpen] = useState(false)
    const manageIsOpen = isOpen ? styles.navOpen : styles.navClose 
    return(
    <> 
        
        <nav className={`${styles.nav}  ${manageIsOpen}`}>
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

export default NavigationButton