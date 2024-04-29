import Link from "next/link";
import styles from "@/ui/Buttons.module.css"
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Id } from "@/lib/types";
import { DeleteButtonClient } from "./ClientButtons";





// dif types reusable buttons
export interface DeleteButtonProps{
    id: string,
    helper: null
    action: (id:string) => void
}

export interface EditButtonProps {
    id: string,
    toEdit: string
}

export const DeleteButtonServer = ({id, action, helper}: DeleteButtonProps) => {

    const deleteWithId = action.bind(helper, id)
    return(
        <form  action={deleteWithId}>
            <DeleteButtonClient/> 
        </form>
    )
}

export const EditButton = ({id, toEdit}: EditButtonProps) => {
    return(
    <Link className={styles.edit_button} href={`/admin/${toEdit}/${id}/edit`}  >
        <p>Редактирай</p>
        <HiOutlinePencilAlt/>
    </Link>
    )
}


export const ChoosePollButton = ({id} : Id)  => {    
    return( 
        <Link href={`anketi/${id}/opcii`}>
            <button>Click me </button>
        </Link>       
        )
    }


export const CheckResults = ({id}: Id) => {
    return(
    <Link href={`anketi/${id}/rezultati`}>
        <button>Погледнете резултатите</button>
    </Link>
    )
}

