import { createCategory, getCategories } from "@/lib/utils/category"
import { EditCategoryButton, DeleteCategoryButton} from "../buttons"
import styles from "@/ui/categories/categories.module.css"

const CreateCategory = async () => {
    const { categories } = await getCategories()

    const createCategoriesElements = () => {

        if(categories?.length! > 0){

        return( categories?.map(category =>

            <div className={styles.container} key={category.id}>
                <h1>Име: {category.name}</h1>
                <p>Описание: {category.description || "няма описание"}</p>
                <EditCategoryButton id={category.id}/>
                <DeleteCategoryButton id={category.id}/>
            </div>

        ))}
    }

    return(
        <>
            <h1 className={styles.title}> Категории </h1>
            <main className={styles.main}>
                <form className={styles.form} action={createCategory}>
                    <div className={styles.name}>
                        <label className={styles.label} htmlFor="name">Име</label>  
                        <input 
                        type="text" 
                        name="category_name" 
                        id="name"
                        className={styles.input}
                        />
                    </div>
                    <div className={styles.desc}>
                        <label className={styles.label} htmlFor="description">Oписание</label>
                        <input
                        type="text"
                        name="description"
                        id="description"
                        className={styles.input}

                        />
                    </div>
                    <button className={styles.btn} type="submit">Създай</button>
                </form>
                    <h2 className={styles.title_2}>Вичкин категории</h2>                    
                <section className={styles.categories_container}>
    
                    {createCategoriesElements() || <p>Няма създадени категории</p>}
                    
                </section> 
            </main>
        </> )
}

export default CreateCategory