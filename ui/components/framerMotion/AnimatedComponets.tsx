"use clint"

import { motion } from "framer-motion"
import styles from "./Framer.module.css"


export interface AnimatedProps {
    text?:string
    isInView: boolean
    className:string
    children?: React.ReactNode
} 

export const Animatedh3 = ({text, isInView, className} : AnimatedProps) => {
   
   return(
   <motion.h3
     initial={{ opacity: 0 }}
     animate={{  opacity: isInView ? 1 : 0 }}
     transition={{delay: 1, duration: "250ms"}}
     className={styles[className]}
    >
        {text}
    </motion.h3>

   ) 
}

export const Animatedp = ({text, isInView, className} : AnimatedProps) => {
    return(

    <motion.p
        className={styles[className]}
        initial={{ opacity: 0 }}
        animate={{ opacity:  isInView ? 1 : 0 }}
        transition={{delay: 1.2, duration: "250ms"}}
        >
            {text}
    </motion.p>

    ) 
}

export const AnimatedDiv = ({isInView, className, children} : AnimatedProps) => {

    return( 
        <motion.div
        className={styles[className]}
        initial={{ opacity: 0 }}
        animate={{ opacity:  isInView ? 1 : 0 }}
        transition={{delay: 0.8, duration: "250ms"}}
        >
            {children}
        </motion.div>

    )
}