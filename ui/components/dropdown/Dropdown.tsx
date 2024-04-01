import ErrorMessage from "../ErrorMessage"
import styles from "@/ui/components/dropdown/Dropdown.module.css"
import { getCategories } from "@/lib/utils/category"

export interface ChooseCategoryProps {
    selected: string | undefined,
    label: string,
    className?: string | undefined | null,
    arrayData?: any[] | undefined,
    table?: string
}

const Dropdown = async ({selected, label, className, arrayData} : ChooseCategoryProps) => {
    const { categories, error } =   await getCategories()
    const createCategoryOptions = () => {
        if(arrayData) {
            return arrayData?.map(data => {
                console.log(data)
               return <option className="test" key={data.title} value={data.id}>{data.title}</option>
            })
        }

        return categories?.map(category => {  
            return(
                <option className="test" key={category.id} value={category.id}>{category.name}</option>
            )
        })
    }

    return (
            <>
                <label htmlFor="poll_id">{label}</label>
                <select 
                defaultValue={selected || undefined} 
                className={`admin_inputs ${styles[className!]}`}  
                name="poll_id" 
                id="poll_id"
                >
                    {createCategoryOptions()}
                </select>
                {error && <ErrorMessage errorText={"Грешка в базата от данни"} className={""}/>} 
            </>
    )
}

export default Dropdown