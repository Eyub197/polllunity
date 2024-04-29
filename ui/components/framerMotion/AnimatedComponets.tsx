"use clint"

import { motion } from "framer-motion"
import styles from "./Framer.module.css"


export interface AnimatedProps {
    text?:string
    isInView: boolean
    className:string
    children?: React.ReactNode
} 

/**
 * Component that renders a h3 element with framer motion animation.
 * @param text - The text to display
 * @param isInView - Determines if the animation should play
 * @param className - The class name to apply
 * @returns The animated h3 element
 */
export const Animatedh3 = ({ text, isInView, className }: AnimatedProps) => {
  // Return the animated h3 element
  return (
    <motion.h3
      // Set the initial opacity to 0
      initial={{ opacity: 0 }}
      // Animate the opacity to 1 or 0 based on if the component is in view
      animate={{ opacity: isInView ? 1 : 0 }}
      // Set the transition delay to 1 second and duration to 250ms
      transition={{ delay: 1, duration: "250ms" }}
      // Add the className
      className={styles[className]}
    >
      {/* Display the text */}
      {text}
    </motion.h3>
  );
}

/**
 * Component that renders a p element with framer motion animation.
 * @param text - The text to display
 * @param isInView - Determines if the animation should play
 * @param className - The class name to apply
 * @returns The animated p element
 */
export const Animatedp = ({ text, isInView, className }: AnimatedProps) => {

  // Return the animated p element
  return (
    <motion.p
      // Set the initial opacity to 0
      initial={{ opacity: 0 }}
      // Animate the opacity to 1 or 0 based on if the component is in view
      animate={{ opacity: isInView ? 1 : 0 }}
      // Set the transition delay to 1.2 seconds and duration to 250ms
      transition={{ delay: 1.2, duration: "250ms" }}
      // Add the className
      className={styles[className]}
    >
      {/* Display the text */}
      {text}
    </motion.p>
  );
}

/**
 * Component that renders a div element with framer motion animation.
 * @param isInView - Determines if the animation should play
 * @param className - The class name to apply
 * @param children - The child elements to render inside the div
 * @returns The animated div element
 */
export const AnimatedDiv = ({ isInView, className, children }: AnimatedProps) => {
  // Return the animated div element
  return (
    <motion.div
      // Set the initial opacity to 0
      initial={{ opacity: 0 }}
      // Animate the opacity to 1 or 0 based on if the component is in view
      animate={{ opacity: isInView ? 1 : 0 }}
      // Set the transition delay to 0.8 seconds and duration to 250ms
      transition={{ delay: 0.8, duration: "250ms" }}
      // Add the className
      className={styles[className]}
    >
      {/* Display the children */}
      {children}
    </motion.div>
  );
}
