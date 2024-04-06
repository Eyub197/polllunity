import {  deleteCategory, getCategories } from "@/lib/utils/category"
import { EditButton} from "../Buttons"
import styles from "@/ui/categories/Categories.module.css"
import CreateCategoryForm from "./CreateCategoryForm"
import { DeleteButtonServer } from "../Buttons"

const CreateCategory = async () => {
    const  {categories}  = await getCategories()
    const createCategoriesElements = () => {
        
        if(categories?.length! > 0){
            return(categories?.map(category => {
                const deleteFunction = deleteCategory.bind(null, category.id)      
            return(
                <div className={styles.container} key={category.id}>
                    <h2>Име: <span className={styles.normal}> {category.name}</span></h2>
                    <h3>Описание: <span className={styles.normal}> {category.description || "няма описание"}</span></h3>
                    <section className={styles.actions_container}>
                        <EditButton id={category.id} toEdit="categories"/>
                        <DeleteButtonServer action={deleteFunction} id={category.id} helper={null}/>
                    </section>
                </div>
            ) 
        }

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