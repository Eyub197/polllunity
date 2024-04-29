import styles from "@/ui/admin/AdminHomePage.module.css"
import Image from "next/image"
import categoryImage from "@/public/category-img.webp"
import pollImage from "@/public/poll-image.webp"
import pollOptionImage from "@/public/poll-option-image.webp"
import Link from "next/link"
import createUserImage from "@/public/createUser.webp"
import deleteUser from "@/public/deleteUser.webp"


const AdminHomePage = () => {
    return (
        <>
        <h1 className={styles.title}> Администраторско табло </h1>
        <main className={styles.admin_option_container}>
            <section className={styles.admin_option}>
                <Image 
                    className={styles.admin_image}
                    src={categoryImage}
                    alt="консепцуална снимка за избор на категории за и за взаимодейстивие с тях"
                />
                <div className={styles.admin_option_desc}>
                    <h2>Категории</h2>
                    <Link className={styles.action} href={"/admin/kategorii"}>Дейстивя</Link>
                </div>
            </section>

            <section className={styles.admin_option}>
                <Image
                    className={styles.admin_image}
                    src={pollImage}
                    alt="консепцуална снимка за избор на анкети за и за взаимодейстивие с тях"
                />
                <div className={styles.admin_option_desc}>
                    <h2>Анкети</h2>
                    <Link className={styles.action} href={"/admin/anketi"}>Дейстивя</Link>
                </div>
            </section>

            <section className={styles.admin_option}>
                <Image
                    className={styles.admin_image}
                    src={pollOptionImage}
                    alt="консепцуална снимка за избор на опции за анкети  и за взаимодейстивие с тях"
                />
                <div className={styles.admin_option_desc}>
                    <h2>Опции</h2>
                    <Link className={styles.action} href={"/admin/opcii"}>Дейстивя</Link>
                </div>
            </section>
            <section className={styles.admin_option}>
                <Image
                    className={styles.admin_image}
                    src={createUserImage}
                    alt="консепцуална снимка за избор на категории за и за взаимодейстивие с тях"
                />
                <div className={styles.admin_option_desc}>
                    <h2>Потребител +</h2>
                    <Link className={styles.action} href={"/admin/potrebiteli"}>Дейстивя</Link>
                </div>
            </section>
            <section className={styles.admin_option}>
                <Image
                    className={styles.admin_image}
                    src={deleteUser}
                    alt="консепцуална снимка за избор на категории за и за взаимодейстивие с тях"
                />
                <div className={styles.admin_option_desc}>
                    <h2>Потребител -</h2>
                    <Link className={styles.action} href={"/admin/premahni-potrebiteli"}>Дейстивя</Link>
                </div>
            </section>

        </main>
        </>
    )
}

export default AdminHomePage
