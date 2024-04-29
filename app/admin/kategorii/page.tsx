import AdminCategories from "@/ui/categories/AdminCategories"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"


const CategoryForm = async() => {
    const currentUserRole = await getCurrentUserRole()    
    
    if(currentUserRole !== "admin") {
        redirect('/')
    }

   return <AdminCategories/>
} 

  

export default CategoryForm