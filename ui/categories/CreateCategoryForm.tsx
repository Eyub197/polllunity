"use client"

import { createCategory } from "@/lib/utils/category"
import { useFormState } from "react-dom"
import styles from "@/ui/categories/Categories.module.css"
import { Button } from "../ClientButtons"

const CreateCategoryForm = () => {
    const [errorMessage, dispatch] = useFormState(createCategory, undefined)

    return(
        <form className={styles.form} action={dispatch}>
            <div className={styles.name}>
                <label htmlFor="name">Име</label>  
                <input 
                type="text" 
                name="category_name" 
                id="name"
                className={`admin_inputs ${styles.input} ${errorMessage && 'input_error'} `}
                />
            {errorMessage && <p className={styles.error_message} >{errorMessage.message}</p>}
            </div>
            <div className={styles.desc}>
                <label htmlFor="description">Oписание</label>
                <textarea
                placeholder="Опционално описание..."
                name="description"
                id="description"
                className={`${"admin_inputs"} ${"input_description"}`}
                />
            </div>
           <Button className="btn_category" action="създай" inAction="създава се..."/>
        </form>
    )
}

export default CreateCategoryForm

