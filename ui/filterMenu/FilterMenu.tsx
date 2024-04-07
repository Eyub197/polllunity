import { getCategories } from "@/lib/utils/category"
import { updateFilters } from "@/lib/utils/category"

export interface SearchParams {
    categoryParams : string,
    statusParams : string
}

const FilterMenu = async ({ categoryParams, statusParams } : SearchParams) => {
    const { categories } = await getCategories()

    return(
        <>
        <form action={updateFilters}>
            <select defaultValue={categoryParams} name="category">
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
            <select defaultValue={statusParams} name="status">
                <option value="zapocnala">започнали</option>
                <option value="vsicki">всички</option>    
                <option value="nezapocnala">незапочнали</option>
                <option value="zavarshena">завършени</option>
                <option value="zatvorena">затворени</option>
            </select>
            <button>Филтрирай</button>
        </form>
        </>
    )
}

//make a array with data to pass is to the custom dropdown 

export default FilterMenu