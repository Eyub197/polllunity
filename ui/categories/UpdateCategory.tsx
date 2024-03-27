"use client"

import { updateCategoryById } from "@/lib/utils/category"
import { UpdateCategoryProps } from "@/lib/types"
import styles from "@/ui/categories/Categories.module.css"
import { useFormState } from "react-dom"
import { Button } from "../ClientButtons"

const UpdateCategory = ({id, name, description}: UpdateCategoryProps) => {

    const updateCategory = updateCategoryById.bind(null, id)
    const [errorMessage, dispatch] = useFormState(updateCategory, "/admin/categories")

    return(
        <>
        <h1 className={styles.title }>Промяна на категория</h1>   
        <main className={styles.main}>
        <form className={styles._form} action={dispatch}>
            <div className={styles.name}>
                <label htmlFor="name">Име</label>  
                <input 
                type="text" 
                name="category_name" 
                id="name"
                className={styles.input}
                defaultValue={name}
                />
            </div>
            <div className={styles.desc}>
                <label htmlFor="description">Oписание</label>
                <textarea
                placeholder="Опционално описание..."    
                name="description"
                id="description"
                className={styles.input_description}
                defaultValue={description!}
                />
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <Button className="btn_category" action="редактирай" inAction="редактира се..." />
        </form>
        </main>
        </>
    )
}

export default UpdateCategory