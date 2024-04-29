"use client"

import styles from "@/ui/auth/RegisterForm.module.css"
import Link from "next/link"
import Image from "next/image"
import { useFormState} from 'react-dom'
import { signUp } from "@/lib/auth"
import { Button } from "@/ui/ClientButtons"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

/**
 * Component for user registration.
 * Displays a form to input username and password,
 * and a button to register.
 * On successful registration, user is redirected to login.
 */

const RegisterForm = () => {
    // stores the error message from the server
    const [errorMessage, dispatch] = useFormState(signUp, undefined);
    // toggles password visibility on/off
    const [showPassword, setShowPassword] = useState(false);
    // checks whether the email field has an error
    const checkEmail = () => errorMessage?.message.includes("email");
    // checks whether the password field has an error
    const checkPassword = () => errorMessage?.message.includes("парола");


    return(
 
        <main className={styles.form_container}>
                {/* Background image */}
                <Image
                width={1000}
                height={1000}
                className={styles.form_image}
                src="/form-image.png" 
                alt="cool poll image stuff" /> 

            <form className={styles.inputs_container} action={dispatch}>
                {/* Form title */}
                <h1 className={styles.text}>Добре дошли! Регистрирайте се</h1>
                {/* Email input */}
                <div className={`${styles.email} `}>
                    <label htmlFor="email">Email</label>
                    <input 
                    className={`${styles.input_style} ${checkEmail() && "input_error"}`} 
                    name="email" 
                    type="email" 
                    id="email"  
                    placeholder="email@gmail.com"   
                    />
                    {/* Error message */}
                    {checkEmail() && <p className={styles.error_message}>{errorMessage?.message}</p> }
                </div>

                {/* Password input */}
                <div className={styles.password}>
                    <label htmlFor="password">Парола</label>
                    {/* Password visibility toggle */}
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
                    {/* Error message */}
                    {checkPassword() && <p className={styles.error_message}> {errorMessage?.message} </p>}
                </div>
                
                {/* Register button */}
                <Button className="btn_register" action="Регистрирай се" inAction="Регистрираме те"/>
                {/* Sign in link */}
                <p className={styles.signIn}>Имате акаунт? <Link className={styles.signIn_link} href={"/vlez"}>Влезте</Link></p>
            </form>
        </main>          
    )
}

export default RegisterForm 