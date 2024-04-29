"use client"

import styles from "@/ui/auth/RegisterForm.module.css"
import Image from "next/image"
import { useFormState} from 'react-dom'
import { Button } from "@/ui/ClientButtons"
import { useState } from "react"
import { createUser } from "@/lib/utils/user"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"



//Like the register form but for creating a user
const CreateUser = () => {
    const [errorMessage, dispatch] = useFormState(createUser, undefined)
    const [showPassword, setShowPassword] = useState(false)

    const checkEmail = () =>  errorMessage?.message.includes("email")
    const checkPassword = () => errorMessage?.message.includes("парола")
    const checkAll = () => errorMessage?.message.includes("вече") 

    return(
        <main className={styles.form_container}>
                <Image
                width={1000}
                height={1000}
                className={styles.form_image}
                src="/form-image.png" 
                alt="cool poll image stuff" /> 

            <form className={styles.inputs_container} action={dispatch}>
            <h1 className={styles.text}>Създайте нов потребител</h1>
                <div className={`${styles.email} `}>
                    <label htmlFor="email">Email</label>
                    <input 
                    className={`${styles.input_style} ${checkEmail() || checkAll() && "input_error"}`} 
                    name="email" 
                    type="email" 
                    id="email"  
                    placeholder="email@gmail.com"   
                    />
                    {checkEmail() && <p className={styles.error_message}>{errorMessage?.message}</p> }
                    {checkAll() && <p className={styles.error_message}>{errorMessage?.message}</p> }

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
                    <input className={`${styles.input_style}  ${checkPassword() || checkAll() && "input_error"}`} 
                    name="password"  
                    type={showPassword ? "text" : "password"}
                    id="password" 
                    />
                    {checkPassword() && <p className={styles.error_message}> {errorMessage?.message} </p>}
                    {checkAll() && <p className={styles.error_message}>{errorMessage?.message}</p> }

                </div>
                <Button className="btn_register" action="Създайте" inAction="Създава се"/>
            </form>
        </main>          
    )
}

export default CreateUser 