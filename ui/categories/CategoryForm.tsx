"use client"

import styles from "@/ui/categories/Categories.module.css"
import { useFormState } from "react-dom"
import { createCategory } from "@/lib/utils/category"
import { Button } from "../ClientButtons"
import { UpdateCategoryProps } from "@/lib/types"
import { updateCategoryById } from "@/lib/utils/category"

const CategoryForm = ({id, name, description, action}: UpdateCategoryProps) => {
    const updateCategory = updateCategoryById.bind(null, id!)    
    
    const [errorUpdate, dispatchUpdate] = useFormState(updateCategory,undefined)
    const [errorCreate, dispatchCreate] = useFormState(createCategory, undefined)

    const dispatch = action === "update"? dispatchUpdate : dispatchCreate
    const error = action === "update"? errorUpdate : errorCreate
    const buttonActionText = action === "update" ? "Обниови" : "Създай"
    const buttonInActionText = action === "update" ? "Обниоване" : "Създава се"
    
    
    return(
        <form className={styles.form} action={dispatch}>
            <div className={styles.name}>
                <label htmlFor="name">Име</label>  
                <input 
                type="text" 
                name="category_name" 
                id="name"
                className={`admin_inputs ${styles.input} ${error && 'input_error'} `}
                defaultValue={name}
               />
            {error && <p className={styles.error_message} >{error.message}</p>}
            </div>
            <div className={styles.desc}>
                <label htmlFor="description">Oписание</label>
                <textarea
                placeholder="Опционално описание..."
                name="description"
                id="description"
                className={`${"admin_inputs"} ${"input_description"}`}
                defaultValue={description!}
                />
            </div>
           <Button className="btn_category" action={buttonActionText} inAction={buttonInActionText}/>
        </form>
    )
}

export default CategoryForm

