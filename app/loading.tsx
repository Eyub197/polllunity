import Image from "next/image"
import logo from "@/public/Logo.svg"
import styles from "@/app/page.module.css"
import AnimatedDots from "@/ui/components/AnimatedDots/AnimatedDots"

/**
 * Component that is displayed when the app is loading.
 *
 * @returns {JSX.Element} The loading page component.
 */
const Loading = () => {
    return (
        <main className={styles.loading_main}>
            {/* The logo image. */}
            <Image
                className={styles.logo}
                src={logo}
                width={150}
                alt="spinning logo"
            />
            {/* The title of the loading page. */}
            <h1 className={styles.loading_title}>Зареждa <AnimatedDots/></h1>
        </main>
    )
}
export default Loading