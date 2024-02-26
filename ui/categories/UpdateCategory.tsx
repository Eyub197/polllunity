import { updateCategoryById } from "@/lib/utils/category"

type UpdateCategoryProps = {
    id:string,
    name:string,
    description:string
}

const UpdateCategory = ({id, name, description}: UpdateCategoryProps) => {

    const updateCategory = updateCategoryById.bind(null, id)

    return(
        <form action={updateCategory}>
        name
        <input type="text" name="category_name" id="" value={name}/>
        description
        <input type="text" name="description" id="" value={description}/>
        <button type="submit">Action</button>
    </form>
    )
}

export default UpdateCategory