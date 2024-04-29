import CategoryForm from "@/ui/categories/CategoryForm"
import { getCategoryById } from "@/lib/utils/category"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"


const EditCategory = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const category = await getCategoryById(id)
    const currentUserRole = await getCurrentUserRole()    
    
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    return(
        <>
            <CategoryForm 
            id={id} 
            name={category?.name!} 
            description = {category?.description!}
            action="update"
            />
        </>
    ) 
}

export default EditCategory