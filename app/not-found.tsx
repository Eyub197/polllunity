import Image from "next/image"
import notFoundImage from "@/public/notFoundImage.png"
import styles from "@/app/not-found.module.css"
import Link from "next/link"

/**
 * The 404 page
 */
const NotFound = () => {  // The 404 page
    return(
        <main className={styles.main}>  {/* The main element of the 404 page */}
            <h1 className={styles.title}> 
             {/* // The title of the 404 page */}
                Страницата, която търсите, сега се разследва. Това е мистерия, която дори Шерлок не може да разреши! 404
            </h1>
            <section className={styles.container}>
                  {/* // The container of the 404 page */}
                <Image
                    className={styles.image}  // The image of the 404 page
                    src={notFoundImage}  // The image of the 404 page
                    alt="Изследовате с лупа, който гледа оснавени стъпки"  // The alt of the image
                />
                <Link
                    className={styles.link}  // The link to the home page
                    href={"/"}  // The link to the home page
                >
                    Начална страница
                </Link>
            </section>
        </main>

    )
}

export default NotFound