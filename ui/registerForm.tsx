import Logo from "./logo"
import styles from "@/ui/registerForm.module.css"

const RegisterForm = () => {
    return(
        <form className={styles.form_style} action="">
            <Logo/>

            <div className={styles.first_name}>
                <label htmlFor="first_name">first name</label>
                <input  type="text" id="first_name" />
            </div>

            <div className={styles.last_name}>
                <label htmlFor="last_name">last name</label>
                <input type="text" id="last_name" />
            </div>

            <div className={styles.username}>
                <label htmlFor="username">username</label>
                <input className={styles.input_style} type="text" id="username" />
            </div>

            <div className={styles.email}>
                <label htmlFor="email">email</label>
                <input className={styles.input_style}  type="text" id="email" />
            </div>

            <div className={styles.password}>
                <label htmlFor="password">password</label>
                <input className={styles.input_style}  type="text" id="password" />
            </div>

        </form>
    )
}

export default RegisterForm