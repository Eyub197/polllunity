import CategoryForm from "@/ui/categories/CategoryForm"
import { getCategoryById } from "@/lib/utils/category"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"


/**
 * Render edit category page.
 * @param {object} params - route params
 * @param {string} params.id - category id
 * @returns {JSX.Element} - EditCategory component
 */
const EditCategory = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const category = await getCategoryById(id)
    const currentUserRole = await getCurrentUserRole()    

    // Redirect to index page if user is not admin
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    /**
     * Edit category component.
     * @returns {JSX.Element} - Edit category form component
     */
    return(
        <>
            <CategoryForm 
            /** Category id */
            id={id} 
            /** Category name */
            name={category?.name!} 
            /** Category description */
            description = {category?.description!}
            /** Form action */
            action="update"
            />
        </>
    ) 
}

export default EditCategory