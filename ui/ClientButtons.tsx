"use client"

import styles from "@/ui/Buttons.module.css"
import buttonStyles from "@/ui/ClientButtons.module.css"
import AnimatedDots from "./components/AnimatedDots/AnimatedDots"
import { useFormStatus } from "react-dom"
import { IoCloseCircle } from "react-icons/io5"
import { ButtonProps } from "@/lib/types"


// div types of reusable client buttons

export interface DeleteButtonProps{
    id: string,
    action: (id:string) => void
}
export const VoteButton = () => {
    const { pending } = useFormStatus()

    return(
        <div className="ds-f">
            <button
            className={styles.vote_button} 
            >
                {pending ? "Обработваме" : "Гласувайте"}
                {pending && <AnimatedDots/>}
            </button>            
        </div>
    )
}

export const Button = ({action, inAction, className}: ButtonProps) => {
    
    const { pending } = useFormStatus()
    
    return (
    <button  aria-disabled={pending} className={buttonStyles[className]}>
        {pending ? `${inAction}` : `${action}`}
        {pending && <AnimatedDots/>}
    </button>
    )
}

export const DeleteButtonClient = () => {
    const { pending } = useFormStatus()
    
    return(
            <button type="submit" className={styles.delete_button}>
                <p>{pending ? "изтрива се" : "изтрий"}</p>
                {pending && <AnimatedDots/>}
                <IoCloseCircle/>
            </button> 
    )
}

