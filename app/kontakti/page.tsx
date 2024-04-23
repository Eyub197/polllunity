import Image from "next/image"
import logo from "@/public/Logo.svg"
import styles from "@/app/page.module.css"
import AnimatedDots from "@/ui/components/AnimatedDots/AnimatedDots"

const LoadingTest = () => {
    return(
        <main className={styles.loading_main}>
            <Image
            className={styles.logo}
            src={logo}
            width={150}
            alt="spinning logo"
            />
            <h1 className={styles.loading_title}>Зареждa <AnimatedDots/></h1>
        </main>
    )

}
export default LoadingTest