import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { deleteCategory } from "@/lib/utils/utils";
import Link from "next/link";

export const EditCategoryButton = ({ id }: { id: string }) : JSX.Element => {

return(
    <>
    <Link href={`/admin/categories/${id}/edit`}  >
        <HiOutlinePencilAlt/>
    </Link>
    </>
)}

export const DeleteCategoryButton = ({ id }: { id: string }) => {

    const deleteCategoryWithId = deleteCategory.bind(null, id)

    return(
        <form action={deleteCategoryWithId}>
            <button type="submit">
                <IoCloseCircle/>
            </button> 
        </form>
    )
}