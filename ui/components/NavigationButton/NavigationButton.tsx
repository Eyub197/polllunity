import Link from "next/link";
import styles from "@/ui/components/NavigationButton/NavigationButton.module.css"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { NavigationButtonProps } from "@/lib/types";

/**
 * Component for creating navigation button
 * @param to - Next.js link href
 * @param back - Boolean that defines if button is for going back
 * @param className - Button class name from styles
 * @param text - Button text
 * @returns Navigation button component
 */
const NavigationButton = ({ to, back, className, text }: NavigationButtonProps) => {
    return (
        <Link href={to} className={styles[className!]}>
            {/* Button container */}
            {back ? (
                <div className={`${styles.link} ${styles[className!]}`}>
                    {/* Left arrow */}
                    <FaArrowLeft className={styles.arrow} /> {/* Button text */}
                    {text}
                </div>
            ) : (
                <div className={`${styles.link} ${styles[className!]}`}>
                    {text} {/* Right arrow */}
                    <FaArrowRight className={styles.arrow} />
                </div>
            )}
        </Link>
    );
}


export default NavigationButton