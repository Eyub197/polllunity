"use client"

import styles from "@/ui/auth/SignIn.module.css"
import { useRouter } from "next/navigation"
import { signIn } from "@/lib/auth"
import { useFormState} from "react-dom"
import { Button } from "@/ui/ClientButtons"
import Image from "next/image"
import frame from '@/public/frame.png'
import frame_2 from '@/public/frame-img.png'
import Link from "next/link"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

/**
 * Component for the sign in form.
 * Displays a form for the user to input their email and password,
 * and a button to sign in.
 * On successful sign in, user is redirected to the home page.
 */
const SignInForm = () : JSX.Element => {
    // The error message from the server when submitting the form
    const [errorMessage, dispatch] = useFormState(signIn, undefined)
    // Whether or not the password is shown
    const [showPassword, setShowPassword] = useState(false)
    const checkEmail = () : boolean =>  Boolean(errorMessage?.message?.includes("email"))
    /**
     * Returns whether or not the email input has an error.
     * @returns {boolean} Whether or not the email input has an error
     */

    /**
     * Returns whether or not the password input has an error.
     * @returns {boolean} Whether or not the password input has an error
     */
    const checkPassword = () : boolean => Boolean(errorMessage?.message?.includes("парола"))


    return (
    <main className={styles.main}>
        <section className={styles.frame_container}>
            <Image
            alt="A frame with a text yes vote"
            src={frame_2}
            className={styles.frame_mobile}
            />
            <Image
            alt="A frame with a text yes vote"
            src={frame}
            className={styles.frame_larger}
            />
        </section>


        <form className={styles.form_styles} action={dispatch}>
            <section className={styles.text_container}>
                <h1 className={styles.text}>Добре дошли! Влезте в акаунта си</h1>
            </section>

            <div className={styles.email}>
                <label htmlFor="email">Email</label>
                <input 
                className={`${styles.input_style} ${checkEmail() && "input_error"} `}
                name="email"
                type="email" 
                id="email"
                />
                {checkEmail() && <div className={styles.error_container}> <p className={styles.error_message}>{errorMessage?.message}</p> </div> }
            </div>
                          
            <div className={styles.password}>
                <label htmlFor="password">Парола</label>
                <button 
                    type="button" 
                    className={styles.eye_open}
                    onClick={() => setShowPassword(prevShowPassword => !prevShowPassword)}
                    >
                        {showPassword ? <FaRegEyeSlash/> : <FaRegEye/> }                  
                </button>
                <input 
                className={`${styles.input_style} ${checkPassword() && "input_error"} `}
                name="password"
                type={showPassword ? "text" : "password"}
                id="password" 
                />
                {checkPassword() && <div className={styles.error_container}> <p className={styles.error_message}>{errorMessage?.message}</p> </div> }

            </div>

                        
            <Button className={"btn_sign_in"} action="Влез" inAction="Влизате"/>

            <p className={styles.register}>Нямате акаунт? <Link className={styles.register_link} href={"/registraciq"}>Регистрирайте се</Link></p>
        </form>
    </main>

    )
    
}




export default SignInForm