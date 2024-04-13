"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Benefits.module.css";

const Benefits = () => {
    const ref = useRef(null);
    const ref2 = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "0px 0px -70px 0px" });
    const isInView2 = useInView(ref2, { once: false, margin: "0px 0px -70px 0px" });
    return (
        <section
        >
            <motion.div
             ref={ref}
             className={styles.benefits}
             initial={{ opacity: 0, x: -100 }}
             animate={{ opacity: isInView ? 1 : 0.5, x: isInView ? 0 : -50 }}
             transition={{ type: "spring", stiffness: 200, duration: 0.5 }}
            >
            <h3>Интуитивен Дизайн</h3>
            <p>Създавайте анкети с лекота благодарение  лесен за използване интерфейс.</p>
            </motion.div>
            <motion.div
             ref={ref2}
             className={styles.benefits}
             initial={{ opacity: 0, x: 100 }}
             animate={{ opacity: isInView2 ? 1 : 0.5, x: isInView2 ? 0 : 200 }}
             transition={{ type: "spring", stiffness: 200, duration: 0.5 }}
            >
            <p>SCROLL TEST</p>
            <p>@scorlll tesjahfjkdshfjksnkfjd</p>
            </motion.div>
        </section>
    );
}

export default Benefits;
