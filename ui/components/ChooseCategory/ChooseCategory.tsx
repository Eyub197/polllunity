import ErrorMessage from "../ErrorMessage"
import styles from "@/ui/components/ChooseCategory/ChooseCategory.module.css"
import { getCategories } from "@/lib/utils/category"

export interface ChooseCategoryProps {
    selectedCategory: string

}

const ChooseCategory = async ({selectedCategory} : ChooseCategoryProps) => {
    const { categories, error } = await getCategories()
    const createCategoryOptions = () => {
        return categories?.map(category => {
            return(
            <option value={category.id} key={category.id}>
                {category.id}{category.name}
            </option>
            )
        })
    }

    return (
            <>
                <label htmlFor="category_id">Id на категория</label>
                <select defaultValue={selectedCategory} className="admin_inputs" name="category_id" id="category_id">
                    {createCategoryOptions()}
                </select>
                {error && <ErrorMessage errorText={"Грешка в базата от данни"} className={""}/>} 
            
            </>
    )
}

export default ChooseCategory