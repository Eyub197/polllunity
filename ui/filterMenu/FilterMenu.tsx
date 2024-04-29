import { getCategories } from "@/lib/utils/category"
import { updateFilters } from "@/lib/utils/category"
import styles from "./FilterMenu.module.css"
export interface SearchParams {
    categoryParams : string,
    statusParams : string
}

/**
 * This is the FilterMenu component.
 * It renders a form with two select dropdowns for filtering the polls based on category and status.
 * It also renders a submit button.
 * @param categoryParams The default value of the category select dropdown
 * @param statusParams The default value of the status select dropdown
 * @returns The FilterMenu component
 */
const FilterMenu = async ({ categoryParams, statusParams } : SearchParams) => {
    const { categories } = await getCategories()

    return(
        // Return a fragment
        <>
        {/* Render a form with a class from the stylesheet */}
        <form className={styles.dropdown_form} action={updateFilters}>
            {/* Render a div with a class from the stylesheet */}
            <div className={styles.categories}>
                {/* Render a label with a for attribute */}
                <label htmlFor="category">Категория</label>
                {/* Render a select dropdown with a class from the stylesheet */}
                <select className={styles.select} defaultValue={categoryParams} name="category">
                    {/* Render an option with a value attribute */}
                    <option value={"vsicki"}>всички</option>
                    {/* Map over the categories and render an option for each */}
                    {categories?.map(category => 
                    <option 
                        key={category.id}  
                        value={category.id}
                        >
                        {category.name}
                    </option>
                    )}
                </select>
            </div>
            {/* Render a div with a class from the stylesheet */}
            <div className={styles.status}>
                {/* Render a label with a for attribute */}
                <label htmlFor="status">Статус на анкета</label>
                {/* Render a select dropdown with two classes from the stylesheet */}
                <select className={`${styles.select} ${styles.select_b}`} defaultValue={statusParams} name="status">
                    {/* Render options with value attributes */}
                    <option value="zapocnala">започнали</option>
                    <option value="vsicki">всички</option>    
                    <option value="nezapocnala">незапочнали</option>
                    <option value="zavarshena">завършени</option>
                    <option value="zatvorena">затворени</option>
                </select>
            </div>
            {/* Render a submit button with a class from the stylesheet */}
            <button className={styles.button}>Филтрирай</button>
        </form>
        </>
    )
}


export default FilterMenu