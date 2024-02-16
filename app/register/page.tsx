import RegisterForm from "@/ui/registerForm"
import Image from "next/image"
import styles from "@/app/register/register.module.css"

const RegisterFormPage = () => {
    return(
        <main className={styles.main}>
            <section>
                <Image
                src={"/form-image.png"}
                width={378}
                height={230}
                alt="cool image of form poll related stuff"
                />
            </section>

            <RegisterForm/>
        </main>
    )
}
export default RegisterFormPage