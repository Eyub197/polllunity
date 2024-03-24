"use client"

import { createCategory } from "@/lib/utils/category"
import { useFormState } from "react-dom"
import styles from "@/ui/categories/categories.module.css"

const CreateCategoryForm = () => {
    const [errorMessage, dispatch] = useFormState(createCategory, undefined)

    return(
        <form className={styles.form} action={dispatch}>
            <div className={styles.name}>
                <label className={styles.label} htmlFor="name">Име</label>  
                <input 
                type="text" 
                name="category_name" 
                id="name"
                className={`${styles.input} ${errorMessage && `${styles.input_error}`  }`}
                />
            {errorMessage && <p className={styles.error_message} >{errorMessage.message}</p>}
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
    )
}

export default CreateCategoryForm