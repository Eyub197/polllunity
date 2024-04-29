"use client"

import { motion } from 'framer-motion';
import Image from "next/image"
import landingImage from "@/public/landingImage.webp"
import styles from "./page.module.css"
import Benefits from "@/ui/components/framerMotion/Benefits"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa";

/**
 * The main page of the application.
 * Contains the hero section and the benefits section.
 */
export default function Home() {
  /**
   * The container variants to be used with Framer Motion.
   * @see {@link https://www.framer.com/api/motion/animation/#animate-variants|Framer Motion variants}
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  /**
   * The item variants to be used with Framer Motion.
   * @see {@link https://www.framer.com/api/motion/animation/#animate-variants|Framer Motion variants}
   */
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <main className={styles.main}>
        {/* Hero section */}
        <motion.section
          className={styles.hero}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.text} variants={itemVariants}>
            <motion.h1 className={styles.hero_title}>
              „Отприщи силата на обратната връзка!“
            </motion.h1>
            <motion.p className={styles.hero_text}>
              <motion.span className="b" variants={itemVariants}>
                Ангажирайте се
              </motion.span>
              ,
              <motion.span className="b" variants={itemVariants}>
                откривайте
              </motion.span>
              и
              <motion.span className="b" variants={itemVariants}>
               действайте
              </motion.span>
              с най-добрия инструмент за динамични анкети.
              <br />
              Присъединете се сега, за да отключите пълния потенциал на незабавната обратна
              връзка.
            </motion.p>
            <Link
              className={styles.hero_btn}
              href="/registraciq"
            >
              Регистрирай се <FaArrowRight className={styles.hero_icon} />
            </Link>
          </motion.div>
          <Image
            priority
            src={landingImage}
            alt="снимка на хора поставящи анкети в кутия"
            className={styles.image}
          />
        </motion.section>

        {/* Benefits section */}
        <motion.h2
          className={styles.question}
          variants={itemVariants}
        >
          Защо да изберете PollUnity<span className={styles.question_mark}>?</span>
        </motion.h2>
        <Benefits />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <small style={{ fontWeight: "bold", letterSpacing: "1px" }}>
          Всички права резервирани@{new Date().getFullYear()}
        </small>
      </footer>
    </>
  );
}

