import Logo from "../logo"
import styles from "@/ui/registerForm.module.css"
import { signUp, logWthGoogle } from "@/lib/auth"


const RegisterForm = () => {
    return(
         
        <main className={styles.form_container}>
            
           <section>
            <img
            className={styles.form_image}
             src="/form-image.png" 
             alt="cool poll image stuff" />
           </section>

            <form className={styles.inputs_container}>
                <div className={styles.logo}><Logo /></div>

                <div className={styles.email}>
                    <label className={styles.bold} htmlFor="email">email</label>
                    <input className={styles.input_style} name="email"  type="text" id="email" />
                </div>

                <div className={styles.password}>
                    <label className={styles.bold}  htmlFor="password">password</label>
                    <input className={styles.input_style} name="password"  type="text" id="password" />
                </div>

                    <button formAction={logWthGoogle} className={styles.google}>Google</button>
                    <p className={styles.apple}>Apple</p>
                    
                <button formAction={signUp} className={styles.submit}>Submit</button>
            </form>
        </main> 
    )
}

export default RegisterForm