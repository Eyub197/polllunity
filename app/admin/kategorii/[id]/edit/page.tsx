import { getCategoryById} from "@/lib/utils/category"
import CategoryForm from "@/ui/categories/CategoryForm"

const EditCategory = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const category = await getCategoryById(id)

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