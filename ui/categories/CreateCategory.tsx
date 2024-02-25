import { createCategory } from "@/lib/utils/utils"
import { getCategories } from "@/lib/utils/utils"
import styles from "@/ui/categories/categories.module.css"
import { EditCategoryButton, DeleteCategoryButton} from "../buttons"

const CreateCategory = async () => {
    const categories = await getCategories()

    const createCategoriesElements = () => {

        if(categories?.length! > 0){

        return( categories?.map(category =>

            <div className={styles.container} key={category.id}>
                <h1>{category.name}</h1>
                <p>{category.description}</p>
                <EditCategoryButton id={category.id}/>
                <DeleteCategoryButton id={category.id}/>
            </div>

        ))}
    }

    return(
        <>
        <form action={createCategory}>
            name
            <input type="text" name="category_name" id="" />
            description
            <input type="text" name="description" id="" />
            <button type="submit">Action</button>
        </form>
        <main className={styles.categories_container}>
            {createCategoriesElements() || <p>Няма създадени категории</p>}
        </main>
        </> )
}

export default CreateCategory