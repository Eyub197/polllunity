import { login } from "@/lib/actions"; 
import styles from "@/ui/registerForm.module.css"


const LoginForm = () => {
    return(
        <form action="">
     <div>
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
    )
    
}

export default LoginForm