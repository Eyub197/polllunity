"use client"

import Logo from "./logo"
import styles from "@/ui/registerForm.module.css"
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from "@/lib/actions";

const RegisterForm = () => {
    const[errorMessage, dispatch] = useFormState(authenticate, undefined)
    return(
         
        <form className={styles.form_style} action={dispatch}>
            <div className={styles.form_container}>

            <div className={styles.logo}><Logo /></div>

                <div className={styles.email}>
                    <label className={styles.bold} htmlFor="email">email</label>
                    <input className={styles.input_style}  type="text" id="email" />
                </div>

                <div className={styles.password}>
                    <label className={styles.bold}  htmlFor="password">password</label>
                    <input className={styles.input_style}  type="text" id="password" />
                </div>

                 <p className={styles.google}>Google</p>
                  <p className={styles.apple}>Apple</p>
                  
                 <button className={styles.submit}>Submit</button>
            </div>
            
        </form>
    )
}

export default RegisterForm