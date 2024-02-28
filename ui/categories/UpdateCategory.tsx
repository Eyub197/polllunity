import { updateCategoryById } from "@/lib/utils/category"
import { Category } from "@/lib/types"

const UpdateCategory = ({id, name, description}: Category) => {

    const updateCategory = updateCategoryById.bind(null, id)

    return(
        <form action={updateCategory}>
        name
        <input type="text" name="category_name" id="" />
        description
        <input type="text" name="description" id="" />
        <button type="submit">Action</button>
    </form>
    )
}

export default UpdateCategory