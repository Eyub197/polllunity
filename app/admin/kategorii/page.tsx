import AdminCategories from "@/ui/categories/AdminCategories"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

/**
 * This function renders the category form page for admins
 * based on their role.
 */
const CategoryForm = async () => {
    // Check the user's role
    const currentUserRole = await getCurrentUserRole()

    // If the user is not an admin, redirect to homepage
    if (currentUserRole !== "admin") {
        redirect("/")
    }

    // If the user is an admin, display the admin categories page
    return <AdminCategories />
}

  

export default CategoryForm