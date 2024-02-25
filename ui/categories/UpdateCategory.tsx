import { updateCategoryById } from "@/lib/utils/test"

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
        <input type="text" name="category_name" id=""/>
        description
        <input type="text" name="description" id="" />
        <button type="submit">Action</button>
    </form>
    )
}

export default UpdateCategory