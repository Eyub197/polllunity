import { getCategories } from "@/lib/utils/category"
import { updateFilters } from "@/lib/utils/category"

export interface SearchParams {
    categoryParams : string,
    statusParams : string
}

const FilterMenu = async ({ categoryParams, statusParams } : SearchParams) => {
    const { categories } = await getCategories()

    const isSelected = (formValue : string, paramsValue : string) => formValue === paramsValue

    return(
        <>
        <form action={updateFilters}>
            <select name="category">
                <option value={"vsicki"}>всички</option>
                {categories?.map(category => 
                <option 
                    key={category.id}  
                    value={category.id}
                    selected={isSelected(category.id, categoryParams)}
                    >
                    {category.name}
                </option>
                )}
            </select>
            <select name="status">
                <option selected={isSelected("segashni",statusParams)} value="segashni">Сегашни</option>
                <option selected={isSelected("vsicki",statusParams)} value="vsicki">Всички</option>    
                <option selected={isSelected("predishni",statusParams )} value="predishni">Предишни</option>
            </select>
            <button>Action</button>
        </form>
        </>
    )
}

export default FilterMenu