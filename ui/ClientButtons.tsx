"use client"

import styles from "@/ui/Buttons.module.css"
import { handleUserVote } from "@/lib/utils/userVote"
import { useFormStatus } from "react-dom"
import { IoCloseCircle } from "react-icons/io5"
import buttonStyles from "@/ui/ClientButtons.module.css"
import { ButtonProps } from "@/lib/types"

export interface DeleteButtonProps{
    id: string,
    action: (id:string) => void
}
export const VoteButton = ({userId, pollId} : any) => {
    return(
        <button onClick={()=> handleUserVote(userId, pollId)}>
            action
        </button>
    )
}

export const Button = ({action, inAction, className}: ButtonProps) => {
    const { pending } = useFormStatus()
    
    return (
    <button aria-disabled={pending}  className={buttonStyles[className]}>
        {pending ? `${inAction}` : `${action}`}
    </button>
    )
}

export const DeleteButtonClient = () => {
    const { pending } = useFormStatus()
    
    return(
            <button type="submit" className={styles.delete_button}>
                <p>{pending ? "изтрива се..." : "изтрий"}</p>
                <IoCloseCircle/>
            </button> 
    )
}

