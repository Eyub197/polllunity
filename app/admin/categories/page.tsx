import CreateCategory from "@/ui/categories/CreateCategory"
import { createClient } from "@/lib/supabase/server"

const CategoryForm = () => {
    const supabase = createClient()

    return (
        <CreateCategory/>
    )
    
} 

export default CategoryForm