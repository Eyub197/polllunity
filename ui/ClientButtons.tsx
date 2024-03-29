"use client"

import styles from "@/ui/Buttons.module.css"
import { handleUserVote } from "@/lib/utils/userVote"
import { useFormStatus } from "react-dom"
import { deleteCategory } from "@/lib/utils/category"
import { IoCloseCircle } from "react-icons/io5"
import buttonStyles from "@/ui/ClientButtons.module.css"
import { ButtonProps } from "@/lib/types"

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

export const DeleteCategoryButton = ({ id }: { id: string }) => {
    const deleteCategoryWithId = deleteCategory.bind(null, id)
    
    return(
        <form className={styles.delete_button} action={deleteCategoryWithId}>
            <DeleteButton/>
        </form>
    )
}

export function DeleteButton () {
    const { pending } = useFormStatus()
    return(
        <button className={styles.delete_button} type="submit">
        <p>{pending ? "изтрива се..." : "изтрий"}</p>
        <IoCloseCircle/>
        </button> 
    )
}


