import Image from "next/image"
import logo from "@/public/Logo.svg"
import styles from "@/app/page.module.css"

const LoadingTest = () => {
    return (
        <main className={styles.loading_main}>
            <Image
                src={logo}
                alt="логото на програмта"
                width={250} // specify width
                height={250} // specify height
            />
            <h1 className={styles.loading_title}>Зареждa
                <span className={styles.dot_1}>.</span>
                <span className={styles.dot_2}>.</span>
                <span className={styles.dot_3}>.</span>
            </h1>
        </main>
    );
}

export default LoadingTest;
