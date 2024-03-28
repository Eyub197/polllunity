import ErrorMessage from "../ErrorMessage"
import styles from "@/ui/components/dropdown/Dropdown.module.css"
import { getCategories } from "@/lib/utils/category"

export interface ChooseCategoryProps {
    selected: string | undefined,
    label: string,
    className?: string | undefined | null
}

const Dropdown = async ({selected, label, className} : ChooseCategoryProps) => {
    const { categories, error } = await getCategories()
    const createCategoryOptions = () => {
        return categories?.map(category => {
            return(
            <option value={category.id} key={category.id}>
                {category.name}
            </option>
            )
        })
    }

    return (
            <>
                <label htmlFor="category_id">{label}</label>
                <select 
                defaultValue={selected || undefined} 
                className={`admin_inputs ${styles[className!]}`}  
                name="category_id" 
                id="category_id"
                >
                    {createCategoryOptions()}
                </select>
                {error && <ErrorMessage errorText={"Грешка в базата от данни"} className={""}/>} 
            </>
    )
}

export default Dropdown