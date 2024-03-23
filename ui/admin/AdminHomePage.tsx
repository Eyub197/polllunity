import styles from "@/ui/admin/AdminHomePage.module.css"
import Image from "next/image"
import categoryImage from "@/public/category-img.webp"
import pollImage from "@/public/poll-image.webp"
import pollOptionImage from "@/public/poll-option-image.webp"
import Link from "next/link"



const AdminHomePage = () => {
    return (
        <>
        <h1 className={styles.title}> Администраторксо табло </h1>
        <main className={styles.admin_option_container}>
            <section className={styles.admin_option}>
                <Image 
                    className={styles.admin_image}
                    src={categoryImage}
                    alt="консепцуална снимка за избор на категории за и за взаимодейстивие с тях"
                />
                <div className={styles.admin_option_desc}>
                    <h2>Категории</h2>
                    <Link className={styles.action} href={"/admin/categories"}>Дейстивя</Link>
                </div>
            </section>

            <section className={styles.admin_option}>
                <Image
                    className={styles.admin_image}
                    src={pollImage}
                    alt="консепцуална снимка за избор на амкети за и за взаимодейстивие с тях"
                />
                <div className={styles.admin_option_desc}>
                    <h2>Анкети</h2>
                    <Link className={styles.action} href={"/admin/polls"}>Дейстивя</Link>
                </div>
            </section>

            <section className={styles.admin_option}>
                <Image
                    className={styles.admin_image}
                    src={pollOptionImage}
                    alt="консепцуална снимка за избор на категории за и за взаимодейстивие с тях"
                />
                <div className={styles.admin_option_desc}>
                    <h2>Опции</h2>
                    <Link className={styles.action} href={"/admin/options"}>Дейстивя</Link>
                </div>
            </section>

        </main>
        </>
    )
}

export default AdminHomePage


// each think will have A image
// there would be like table name, add, seeAll, create, delete
// or just a see all with all of the options and thinks for delete, edit, in the card it self