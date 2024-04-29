import styles from "@/ui/components/AnimatedDots/AnimatedDots.module.css"

// reusable animated dots   
const AnimatedDots = () => {
    return(
        <>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
        </>
    )
}

export default AnimatedDots