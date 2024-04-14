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
    const isInView = useInView(ref, { once: false, margin:"-300px"})
    const isInView2 = useInView(ref2, { once: false, margin:"-300px"})
    const isInView3 = useInView(ref3, { once: false, margin:"-200px"})
    return (
        <section>
            <motion.div
             ref={ref}
             className={styles.benefits}
             initial={{ opacity: 0, x: "-300vw" }}  
             animate={{ opacity: isInView ? 1 : 0.1, x: isInView ? 0 : -100 }}
             transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
            >
                <Image className={styles.benefit_image} src={intuitiveDesign} alt="снимка на интуитивен дизайн" />
                <div className={styles.bottom_part_benefit}>
                    <h3 className={styles.benefit_title}>Интуитивен Дизайн</h3>
                    <p className={styles.benefit_text}>Създавайте анкети с лекота благодарение  лесен за използване интерфейс<span className="pc">.</span></p>
                </div>
            </motion.div>
            <motion.div
             ref={ref2}
             className={styles.benefits}
             initial={{ opacity: 0, x: "200vw" }}
             animate={{ opacity: isInView2 ? 1 : 0.1, x: isInView2 ? 0 : 200 }}
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
             className={styles.benefits}
             initial={{ opacity: 0, x: "-200vw" }}
             animate={{ opacity: isInView3 ? 1 : 0.1, x: isInView3 ? 0 : -100 }}
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
