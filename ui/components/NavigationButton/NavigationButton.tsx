import Link from "next/link";
import styles from "@/ui/components/NavigationButton/NavigationButton.module.css"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { NavigationButtonProps } from "@/lib/types";

const NavigationButton = ({to, back, className, text} : NavigationButtonProps) => {
   return( <Link href={to}  className={styles[className!]}>
        {
            back  ? 
            <div className={`${styles.link} ${styles[className!]}`}>
              <FaArrowLeft className={styles.arrow} /> {text}       
            </div>
            :
            <div className={`${styles.link} ${styles[className!]}`}>
                {text} <FaArrowRight  className={styles.arrow} /> 
            </div>
        }

    </Link>)
}


export default NavigationButton