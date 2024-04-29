"use client"
import styles from "@/ui/components/moreInformation/MoreInformation.module.css"
import { useState } from "react"
import { FcInfo } from "react-icons/fc"

export interface MoreInformationProps {
  description: string;
}

/**
 * MoreInformation component
 *
 * Component that displays a button with some information
 * When hovered, a bubble with the information is displayed
 */
const MoreInformation = ({ description }: MoreInformationProps) => {
  /**
   * Tracks whether the user is hovering over the component
   */
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Toggles the isHovered state
   */
  const toggleHover = () => setIsHovered(!isHovered);

  return (
    <div className={styles.container}>
      <FcInfo
        /**
         * Icon for the component
         */
        className={styles.icon}
        /**
         * Called when the user hovers over the component
         */
        onMouseEnter={toggleHover}
        /**
         * Called when the user stops hovering over the component
         */
        onMouseLeave={toggleHover}
      />
      <div
        /**
         * Classes for the bubble
         */
        className={
          isHovered
            ? `${styles.bubble} ${styles.show}`
            : `${styles.bubble}`
        }
      >
        {
          /**
           * If description is not provided, show default text
           */
          description || "Няма допълнителна информация"
        }
        <div className={styles.tail}></div>
      </div>
    </div>
  )
}

export default MoreInformation;
