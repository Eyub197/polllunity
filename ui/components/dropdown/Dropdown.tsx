import ErrorMessage from "../ErrorMessage"
import styles from "@/ui/components/dropdown/Dropdown.module.css"
import { getCategories } from "@/lib/utils/category"

export interface ChooseCategoryProps {
    selected: string | undefined,
    label: string,
    className?: string | undefined | null,
    arrayData?: any[] | undefined,
    about?: string
}

const Dropdown = async ({selected, label, className, arrayData, about} : ChooseCategoryProps) => {
    const createOptions = () => {
        if(arrayData) {
            return arrayData?.map(data => {
                console.log(data)
               return (
                <option 
                    key={data.title || data.name || data.text}
                    value={data.id}>
                    {data.title || data.name || data.text}
                </option>
                )
            })
        }
    }

    return (
            <>
                <label htmlFor={about}>{label}</label>
                <select 
                defaultValue={selected || undefined} 
                className={`admin_inputs ${styles[className!]}`}  
                name={about}
                id={about}
                >
                    {createOptions()}
                </select>
            </>
    )
}

export default Dropdown