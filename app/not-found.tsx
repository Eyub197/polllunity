import Image from "next/image"
import notFoundImage from "@/public/notFoundImage.png"
import styles from "@/app/not-found.module.css"
import Link from "next/link"

const NotFound = () => {
    return(
        <main className={styles.main}>
            <h1 className={styles.title}> Страницата, която търсите, сега се разследва. Това е мистерия, която дори Шерлок не може да разреши!</h1>
            <section className={styles.container}>
            <Image className={styles.image} src={notFoundImage} alt="Изследовате с лупа, който гледа оснавени стъпки" />
            <Link className={styles.link} href={"/"}>Начална страница</Link>
            </section>
        </main>

    )
}

export default NotFound