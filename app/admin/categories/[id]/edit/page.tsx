import { getCategoryById} from "@/lib/utils/category"
import UpdateCategory from "@/ui/categories/UpdateCategory"


const EditCategory = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const { name, description } = await getCategoryById(id)

    return(
        <>
        <p>{name} {description}</p>
        <UpdateCategory 
        id={id} 
        name={name} 
        description = {description}/>
        </>
    ) 
}

export default EditCategory