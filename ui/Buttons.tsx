import Link from "next/link";
import styles from "@/ui/Buttons.module.css"
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Id } from "@/lib/types";
import { DeleteButtonClient } from "./ClientButtons";
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
        <form className={styles.delete_button} action={deleteWithId}>
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

//** Admin link */
// export const AdminPage = async (isActive: PropsAdmin) => {
//     const currentUserRole = await getCurrentUserRole()

//     if(currentUserRole === "admin") {
//         return(
//             <Link 
//                 href="/admin"
//                 className={`${styles.admin_link}  ${isActive && styles.admin_link_active}`}
//                 >
//                 Админ        
//             </Link>
//         )
//     }

// }
