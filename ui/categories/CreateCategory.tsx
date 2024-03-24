import { createCategory, getCategories } from "@/lib/utils/category"
import { EditCategoryButton} from "../buttons"
import styles from "@/ui/categories/categories.module.css"
import { DeleteCategoryButton } from "../ClientButtons"
import CreateCategoryForm from "./CreateCategoryForm"

const CreateCategory = async () => {
    const { categories } = await getCategories()
    
    const createCategoriesElements = () => {
        
        if(categories?.length! > 0){
            
            return( categories?.map(category =>   
            <div className={styles.container} key={category.id}>
                <h2>Име: <span className={styles.normal}> {category.name}</span></h2>
                <h3>Описание: <span className={styles.normal}> {category.description || "няма описание"}</span></h3>
                <section className={styles.actions_container}>
                    <EditCategoryButton id={category.id}/>
                    <DeleteCategoryButton id={category.id} />
                </section>
            </div>

        ))}
    }

    return(
        <>
            <h1 className={styles.title}> Категории </h1>
            <main className={styles.main}>
                <CreateCategoryForm/>
                <h2 className={styles.title_2}>Висички категории</h2>     

                <section className={styles.categories_container}>
                    {createCategoriesElements() || <p>Няма създадени категории</p>}
                </section> 
            </main>
        </> )
}

export default CreateCategory