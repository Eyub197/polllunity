import ErrorMessage from "../ErrorMessage"
import styles from "@/ui/components/ChooseCategory/ChooseCategory.module.css"
import { getCategories } from "@/lib/utils/category"

export interface ChooseCategoryProps {
    selectedCategory: string | undefined,
    label: string
}

const Dropdown = async ({selectedCategory, label} : ChooseCategoryProps) => {
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
                <select defaultValue={selectedCategory || undefined} className="admin_inputs" name="category_id" id="category_id">
                    {createCategoryOptions()}
                </select>
                {error && <ErrorMessage errorText={"Грешка в базата от данни"} className={""}/>} 
            
            </>
    )
}

export default Dropdown