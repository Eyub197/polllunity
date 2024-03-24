import { updateCategoryById } from "@/lib/utils/category"
import { UpdateCategoryProps } from "@/lib/types"
import styles from "@/ui/categories/Categories.module.css"

const UpdateCategory = ({id, name, description}: UpdateCategoryProps) => {

    const updateCategory = updateCategoryById.bind(null, id)

    return(
        <>
        <h1 className={styles.title }>Промяна на категория</h1>   
        <main className={styles.main}>
        <form className={styles._form} action={updateCategory}>
            <div className={styles.name}>
                <label className={styles.label} htmlFor="name">Име</label>  
                <input 
                type="text" 
                name="category_name" 
                id="name"
                className={styles.input}
                defaultValue={name}
                />
            </div>
            <div className={styles.desc}>
                <label className={styles.label} htmlFor="description">Oписание</label>
                <input
                type="text"
                name="description"
                id="description"
                className={styles.input}
                defaultValue={description!}
                />
            </div>
            <button className={styles.btn} type="submit">Създай</button>
        </form>
        </main>
        </>
    )
}

export default UpdateCategory