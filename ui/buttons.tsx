
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { deleteCategory } from "@/lib/utils/category";
import Link from "next/link";
import { deletePoll } from "@/lib/utils/polls";
import { deleteOption } from "@/lib/utils/options";
import { Id } from "@/lib/types";

// ** ===Category===

export const EditCategoryButton = ({ id }: { id: string }) : JSX.Element => {

return(
    <Link href={`/admin/categories/${id}/edit`}  >
        <HiOutlinePencilAlt/>
    </Link>
)}

export const DeleteCategoryButton = ({ id }: { id: string }) => {

    const deleteCategoryWithId = deleteCategory.bind(null, id)

    return(
        <form action={deleteCategoryWithId}>
            <button type="submit">
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


export const ChoosePollButton = (id:Id)  => {    
    return(        
            <button>Click me </button>
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


    