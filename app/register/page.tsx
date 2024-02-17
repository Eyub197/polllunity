import RegisterForm from "@/ui/registerForm"
import Image from "next/image"
import styles from "@/app/register/register.module.css"

const RegisterFormPage = () => {
    return(
        <main className={styles.main}>
            <section className={styles.image_container}>
                <Image
                className={styles.form_image}
                src={"/form-image.png"}
                alt="cool image of form poll related stuff"
                width={378}
                height={230}
                layout="responsive"
                />
            </section>

            <RegisterForm/>
        </main>
    )
}
export default RegisterFormPage