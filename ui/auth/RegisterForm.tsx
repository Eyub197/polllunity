"use client"

import styles from "@/ui/auth/RegisterForm.module.css"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useFormState} from 'react-dom'
import { signUp, logInWithGoogle } from "@/lib/auth"
import { Button } from "@/ui/ClientButtons"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const RegisterForm = () => {
    const [errorMessage, dispatch] = useFormState(signUp, undefined)
    const [showPassword, setShowPassword] = useState(false)
    const checkEmail = () =>  errorMessage?.message.includes("email")
    const checkPassword = () => errorMessage?.message.includes("парола")
    return(
        <main className={styles.form_container}>
                <Image
                width={1000}
                height={1000}
                className={styles.form_image}
                src="/form-image.png" 
                alt="cool poll image stuff" /> 

            <form className={styles.inputs_container} action={dispatch}>
            <h1 className={styles.text}>Добре дошли! Регистрирайте се</h1>
                <div className={`${styles.email} `}>
                    <label htmlFor="email">Email</label>
                    <input 
                    className={`${styles.input_style} ${checkEmail() && "input_error    "}`} 
                    name="email" 
                    type="email" 
                    id="email"  
                    placeholder="email@gmail.com"   
                    />
                    {checkEmail() && <p className={styles.error_message}>{errorMessage?.message}</p> }
                </div>

                <div className={styles.password}>
                    <label htmlFor="password">Парола</label>
                    <button 
                    type="button" 
                    className={styles.eye_open}
                    onClick={() => setShowPassword(prevShowPassword => !prevShowPassword)}
                    >
                        { showPassword ? <FaRegEyeSlash/> : <FaRegEye/> }                  
                    </button>
                    <input className={`${styles.input_style}  ${checkPassword() && "input_error"}`} 
                    name="password"  
                    type={showPassword ? "text" : "password"}
                    id="password" 
                    />
                    {checkPassword() && <p className={styles.error_message}> {errorMessage?.message} </p>}
                </div>

                <button formAction={logInWithGoogle} className={styles.google}>Google</button>
                <p className={styles.apple}>Apple</p>
                
                <Button className="btn_register" action="Регистрирай се" inAction="Регистрираме те"/>
                <p className={styles.signIn}>Имате акаунт? <Link className={styles.signIn_link} href={"/vlez"}>Влезте</Link></p>
            </form>
        </main>          
    )
}

export default RegisterForm 