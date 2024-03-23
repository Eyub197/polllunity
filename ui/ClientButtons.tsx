"use client"

import { handleUserVote } from "@/lib/utils/userVote"
import { useFormStatus } from "react-dom"
import stylesRegister from "@/ui/forms/registerForm.module.css"
import stylesSignIn from "@/ui/forms/signIn.module.css" 

export const VoteButton = ({userId, pollId} : any) => {
    return(
        <button onClick={()=> handleUserVote(userId, pollId)}>
            action
        </button>
    )
}

export const RegisterButton = () => {      
    const { pending } = useFormStatus()
    
    return (
    <button aria-disabled={pending}  className={stylesRegister.submit}>
        {pending ? "Регистрираме те... " : " Регистрирай се"}
    </button>
    )
}

export const LoginButton = () => {      
    const { pending } = useFormStatus()
    
    return (
    <button aria-disabled={pending}  className={stylesSignIn.submit}>
        {pending ? "Влизате... " : "Влез"}
    </button>
    )
}