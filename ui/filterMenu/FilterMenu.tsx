import { getCategories } from "@/lib/utils/category"
import { updateFilters } from "@/lib/utils/category"
import styles from "./FilterMenu.module.css"
export interface SearchParams {
    categoryParams : string,
    statusParams : string
}

const FilterMenu = async ({ categoryParams, statusParams } : SearchParams) => {
    const { categories } = await getCategories()

    return(
        <>
        <form className={styles.dropdown_form} action={updateFilters}>
            <div className={styles.categories}>
            <label htmlFor="category">Категория</label>
            <select className={styles.select} defaultValue={categoryParams} name="category">
                <option value={"vsicki"}>всички</option>
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
            <div className={styles.status}>
            <label htmlFor="status">Статус на анкета</label>
            <select className={`${styles.select} ${styles.select_b}`} defaultValue={statusParams} name="status">
                <option value="zapocnala">започнали</option>
                <option value="vsicki">всички</option>    
                <option value="nezapocnala">незапочнали</option>
                <option value="zavarshena">завършени</option>
                <option value="zatvorena">затворени</option>
            </select>
            </div>
            <button className={styles.button}>Филтрирай</button>
        </form>
        </>
    )
}

//make a array with data to pass is to the custom dropdown 

export default FilterMenu