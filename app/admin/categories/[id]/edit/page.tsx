import { getCategoryById} from "@/lib/utils/category"
import UpdateCategory from "@/ui/categories/UpdateCategory"


const EditCategory = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const category = await getCategoryById(id)

    return(
        <>
            <UpdateCategory 
            id={id} 
            name={category?.name!} 
            description = {category?.description!}/>
        </>
    ) 
}

export default EditCategory