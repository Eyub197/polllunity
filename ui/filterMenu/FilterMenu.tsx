import { getCategories } from "@/lib/utils/category"
import { updateFilters } from "@/lib/utils/category"

const FilterMenu = async () => {
    const categories = await getCategories()
    return(
        <form action={updateFilters}>
            <select defaultValue={"всички"} name="category">
                <option>всички</option>
                {categories?.map(category => 
                <option 
                    key={category.id}  
                    value={category.id}>
                    {category.name}
                </option>
                )}
            </select>
            <button>Action</button>
        </form>

    )
}

export default FilterMenu