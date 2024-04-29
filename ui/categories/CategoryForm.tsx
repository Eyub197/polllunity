"use client"

import styles from "@/ui/categories/Categories.module.css"
import { useFormState } from "react-dom"
import { createCategory } from "@/lib/utils/category"
import { Button } from "../ClientButtons"
import { UpdateCategoryProps } from "@/lib/types"
import { updateCategoryById } from "@/lib/utils/category"

/**
 * CategoryForm component for updating or creating categories
 * @param id category id
 * @param name category name
 * @param description category description
 * @param action action for the component, "update" or "create"
 */
const CategoryForm = ({id, name, description, action}: UpdateCategoryProps) => {
    // Bind update category by id function to id
    const updateCategory = updateCategoryById.bind(null, id!)
    
    // Create useFormState hooks for update/create category
    const [errorUpdate, dispatchUpdate] = useFormState(updateCategory,undefined)
    const [errorCreate, dispatchCreate] = useFormState(createCategory, undefined)

    // Determine which dispatch to use based on action prop
    const dispatch = action === "update" ? dispatchUpdate : dispatchCreate
    // Determine which error to use based on action prop
    const error = action === "update" ? errorUpdate : errorCreate
    // Determine which buttonActionText to use based on action prop
    const buttonActionText = action === "update" ? "Обниovi" : "Създай"
    // Determine which buttonInActionText to use based on action prop
    const buttonInActionText = action === "update" ? "Обниоване" : "Създава се"
    
    
    return(
        // Create form with className from module css
        <form className={styles.form} action={dispatch}>
            {/* Create name label and input with className from module css */}
            <div className={styles.name}>
                <label htmlFor="name">Име</label>  
                <input 
                type="text" 
                name="category_name" 
                id="name"
                // Add className from module css and error className if error exists
                className={`admin_inputs ${styles.input} ${error && 'input_error'} `}
                // Set default value from props
                defaultValue={name}
               />
            {/* Show error message if error exists */}
            {error && <p className={styles.error_message} >{error.message}</p>}
            </div>
            {/* Create description label and textarea with className from module css */}
            <div className={styles.desc}>
                <label htmlFor="description">Oписание</label>
                <textarea
                placeholder="Опционално описание..."
                name="description"
                id="description"
                className={`${"admin_inputs"} ${"input_description"}`}
                // Set default value from props
                defaultValue={description!}
                />
            </div>
            {/* Create button with className from module css and action/inAction props */}
           <Button className="btn_category" action={buttonActionText} inAction={buttonInActionText}/>
        </form>
    )
}



export default CategoryForm

