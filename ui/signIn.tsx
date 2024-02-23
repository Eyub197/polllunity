import { login } from "@/lib/actions"; 
import styles from "@/ui/signIn.module.css"
import { prisma } from "@/lib/prisma";
import Logo from "./logo";

const SignInForm = () : JSX.Element => {

    return(
    
    <main className={styles.main}>
        <form className={styles.form_styles} action="">
            <p className={styles.text}>Добре дошли! Влезте в акаунта си</p>

            <div className={styles.email}>
                <label className={styles.bold} htmlFor="email">email</label>
                <input className={styles.input_style} name="email"  type="text" id="email" />
            </div>
                          
            <div className={styles.password}>
                <label className={styles.bold}  htmlFor="password">password</label>
                <input className={styles.input_style} name="password"  type="text" id="password" />
            </div>

            <p className={styles.google}>Google</p>
            <p className={styles.apple}>Apple</p>
                        
            <button formAction={login} className={styles.submit}>Submit</button>
        </form>
    </main>
    

    )
    
}

export default SignInForm