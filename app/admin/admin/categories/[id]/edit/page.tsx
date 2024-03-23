import { Category } from "@/lib/types"
import { getCategoryById} from "@/lib/utils/category"
import UpdateCategory from "@/ui/categories/UpdateCategory"


const EditCategory = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const category = await getCategoryById(id)

    return(
        <>
            <p>
            {category?.name} {category?.description}</p>
            <UpdateCategory 
            id={id} 
            name={category?.name!} 
            description = {category?.description!}/>
        </>
    ) 
}

export default EditCategory