"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Benefits.module.css";
import Image from "next/image";
import intuitiveDesign from "@/public/intuitiveDesign.webp"
import secure from "@/public/secure.webp"
import realTime2 from "@/public/realTime2.webp"

const Benefits = () => {
 
    const ref = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const isInView = useInView(ref, { once: false, margin:"-250px"})
    const isInView2 = useInView(ref2, { once: false, margin:"-250px"})
    const isInView3 = useInView(ref3, { once: false, margin:"-250px"})
 
    return (
        <section className={styles.benefits}>
            
            <motion.div
             ref={ref}
             className={styles.benefit}
             initial={{ opacity: 0, x: "-100vw" }}  
             animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -100 }}
             transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
            >
                <Image className={styles.benefit_image} src={intuitiveDesign} alt="снимка на интуитивен дизайн" />
               
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{delay: 0.8, duration: "250ms"}}
                
                
                className={styles.bottom_part_benefit}>
                    <motion.h3
                     className={styles.benefit_title}
                     initial={{ opacity: 0 }}
                     animate={{  opacity: isInView ? 1 : 0 }}
                     transition={{delay: 1, duration: "250ms"}}
                     
                     
                     
                     >Интуитивен Дизайн</motion.h3>
                    <motion.p 
                    className={styles.benefit_text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{delay: 1.2, duration: "250ms"}}
                    
                    
                    >Създавайте анкети с лекота благодарение  лесен за използване интерфейс<span className="pc">.</span></motion.p>
                </motion.div>

            </motion.div>
            
            <motion.div
             ref={ref2}
             className={styles.benefit}
             initial={{ opacity: 0, x: "200vw" }}
             animate={{ opacity: isInView2 ? 1 : 0, x: isInView2 ? 0 : 100 }}
             transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
             >
            <Image src={secure} alt="снимка на катинар"  className={styles.benefit_image} />
            <div className={styles.bottom_part_benefit}>
                <h3 className={styles.benefit_title}>Защита на данни</h3>
                <p className={styles.benefit_text}>
                    Ангажирани да предоставяме услуга, която 
                    гарантира, че вашата информация е защитена с най-съвременни технологии за сигурност<span className="pc">.</span>
                </p>
            </div>
            </motion.div>


            <motion.div
             ref={ref3}
             className={styles.benefit}
             initial={{ opacity: 0, x: "-200vw" }}
             animate={{ opacity: isInView3 ? 1 : 0, x: isInView3 ? 0 : -100 }}
             transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
            >
                <Image className={styles.benefit_image} src={realTime2} alt="снимка на интуитивен дизайн" />
                <div className={styles.bottom_part_benefit}>
                    <div className={styles.line_helper}>
                        <h3 className={styles.benefit_title}>Резултати в реално време </h3>
                    </div>
                    <p className={styles.benefit_text}>
                        Имате възможността да виждате и анализирате обратната връзка от вашите анкети мигновено<span className="pc">.</span>
                    </p>
                </div>
            </motion.div>
            
        </section>
    )
}

export default Benefits
