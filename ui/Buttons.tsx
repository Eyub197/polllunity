import Link from "next/link";
import styles from "@/ui/Buttons.module.css"
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { deleteCategory } from "@/lib/utils/category";
import { deletePoll } from "@/lib/utils/polls";
import { deleteOption } from "@/lib/utils/options";
import { Id } from "@/lib/types";
export interface DeleteButtonProps{
    id: string,
    helper: null
    action: (id:string) => void
}
export const DeleteButton = ({id, action, helper}: DeleteButtonProps) => {

    const deleteWithId = action.bind(helper, id)
    return(
        <form className={styles.delete_button} action={deleteWithId}>
            <button className={styles.delete_button} type="submit">
                <p>Изтрий</p>
                <IoCloseCircle/>
            </button> 
        </form>
    )
}

// ** ===Category===

export const EditCategoryButton = ({ id }: { id: string }) : JSX.Element => {

return(
    <Link className={styles.edit_button} href={`/admin/categories/${id}/edit`}  >
        <p>Редактирай</p>
        <HiOutlinePencilAlt/>
    </Link>
)}

export const DeleteCategoryButton = ({ id }: { id: string }) => {

    const deleteCategoryWithId = deleteCategory.bind(null, id)

    return(
        <form className={styles.delete_button} action={deleteCategoryWithId}>
            <button className={styles.delete_button} type="submit">
                <p>Изтрий</p>
                <IoCloseCircle/>
            </button> 
        </form>
    )}

// ** ===Poll===

export const EditPollButton = ({ id }: { id: string }) : JSX.Element => {

    return(
        <Link href={`/admin/polls/${id}/edit`}  >
            <HiOutlinePencilAlt/>
        </Link>
    )}
    
export const DeletePollButton = ({ id }: { id: string }) => {
    
    const deletePollWithId = deletePoll.bind(null, id)
    
    return(
        <form action={deletePollWithId}>
            <button type="submit">
                <IoCloseCircle/>
            </button> 
        </form>
    )}


export const ChoosePollButton = ({id} : Id)  => {    
    return( 
        <Link href={`anketi/${id}/opcii`}>
            <button>Click me </button>
        </Link>       
        )
    }


// ** ===Option===

export const EditOptionButton = ({ id }: { id: string }) : JSX.Element => {

    return(
        <Link href={`/admin/options/${id}/edit`}  >
            <HiOutlinePencilAlt/>
        </Link>
    )}
    
export const DeleteOptionButton = ({ id }: { id: string }) => {
    
    const deleteOptionWithId = deleteOption.bind(null, id)
    
    return(
        <form action={deleteOptionWithId}>
            <button type="submit">
                <IoCloseCircle/>
            </button> 
        </form>
    )}


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
