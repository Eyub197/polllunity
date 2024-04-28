"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Benefits.module.css";
import Image from "next/image";
import intuitiveDesign from "@/public/intuitiveDesign.webp"
import secure from "@/public/secure.webp"
import realTime2 from "@/public/realTime2.webp"
import { Animatedh3, Animatedp, AnimatedDiv } from "./AnimatedComponets";


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
             initial={{ opacity: 0, x: "-100vw"}}  
             animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -100}}
             transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
            >
                <Image className={styles.benefit_image} src={intuitiveDesign} alt="снимка на интуитивен дизайн" />
               
                <AnimatedDiv
                isInView={isInView}
                className="bottom_part_benefit"
                >

                    <Animatedh3 text="Интуитивен дизайн" isInView={isInView} className="benefit_title"/>
                    <Animatedp text="Създавайте анкети с лекота благодарение  лесен за използване интерфейс" isInView={isInView} className="benefit_text" />

                </AnimatedDiv>

            </motion.div>
            
            <motion.div
             ref={ref2}
             className={styles.benefit}
             initial={{ opacity: 0, x: "200vw" }}
             animate={{ opacity: isInView2 ? 1 : 0, x: isInView2 ? 0 : 100 }}
             transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
             >
            
            <Image src={secure} alt="снимка на катинар"  className={styles.benefit_image} />
            
            <AnimatedDiv             
            isInView={isInView2}
            className="bottom_part_benefit"
            >
            
                <Animatedh3 text="Защита на данни" isInView={isInView2} className="benefit_title"/>
                <Animatedp text="Ангажирани да предоставяме услуга, която 
                    гарантира, че вашата информация е защитена с най-съвременни технологии за сигурност" isInView={isInView2} className="benefit_text"/>
                
            </AnimatedDiv>
            
            </motion.div>
            
            <motion.div
             ref={ref3}
             className={styles.benefit}
             initial={{ opacity: 0, x: "-200vw" }}
             animate={{ opacity: isInView3 ? 1 : 0, x: isInView3 ? 0 : -100 }}
             transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
            >
                <Image className={styles.benefit_image} src={realTime2} alt="снимка на интуитивен дизайн" />
                
                <AnimatedDiv 
                isInView={isInView3}
                className="bottom_part_benefit"
                >
                    <Animatedh3 text="Резултати в реално време" isInView={isInView3} className="benefit_title"/>
                    <Animatedp text="Имате възможността да виждате и анализирате обратната връзка от вашите анкети мигновено" 
                    className="benefit_text" isInView={isInView3}
                    />
        
                </AnimatedDiv>
           
            </motion.div>
            
        </section>
    )
}

export default Benefits
