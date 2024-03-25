"use client"

import styles from "@/ui/forms/SignIn.module.css"
import { signIn } from "@/lib/auth"
import { useFormState} from "react-dom"
import { Button } from "@/ui/ClientButtons"
import Image from "next/image"
import frame from '@/public/frame.png'
import frame_2 from '@/public/frame-img.png'
import { Suspense } from "react"
import Link from "next/link"

const SignInForm = () : JSX.Element => {
    const [errorMessage, dispatch] = useFormState(signIn, undefined)
    const checkEmail = () =>  errorMessage?.message.includes("email")
    const checkPassword = () => errorMessage?.message.includes("парола")

    return (
        <Suspense fallback={<p>Loading...</p>}>



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
                type="text" 
                id="email"
                />
                {checkEmail() && <div className={styles.error_container}> <p className={styles.error_message}>{errorMessage.message}</p> </div> }
            </div>
                          
            <div className={styles.password}>
                <label htmlFor="password">Парола</label>
                <input 
                className={`${styles.input_style} ${checkPassword() && styles.input_error} `}
                name="password"
                type="text"
                id="password" 
                />
                {checkPassword() && <div className={styles.error_container}> <p className={styles.error_message}>{errorMessage.message}</p> </div> }

            </div>

            <p className={styles.google}>Google</p>
            <p className={styles.apple}>Apple</p>
                        
            <Button className={"btn_sign_in"} action="Влез" inAction="В лизате ..."/>

            <p className={styles.register}>Нямате акаунт? <Link className={styles.register_link} href={"/register"}>Регистрирайте се</Link></p>
        </form>
    </main>

        </Suspense>
    )
    
}

export default SignInForm