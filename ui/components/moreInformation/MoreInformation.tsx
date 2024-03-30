"use client"
import styles from "@/ui/components/moreInformation/MoreInformation.module.css";
import { useState } from "react";
import { FcInfo } from "react-icons/fc";

export interface MoreInformationProps {
  description: string;
}

const MoreInformation = ({ description }: MoreInformationProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = () => setIsHovered(!isHovered);

  return (
    <div className={styles.container}>
      <FcInfo
        className={styles.icon}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      />
      <div
        className={isHovered ? `${styles.bubble} ${styles.show}` : `${styles.bubble}`}
      >
        {description || "Няма допълнителна информация"}
        <div className={styles.tail}></div>
      </div>
    </div>
  );
};

export default MoreInformation;
