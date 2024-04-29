import { getCurrentUserRole } from "@/lib/utils/user"
import AdminHomePage from "@/ui/admin/AdminHomePage"
import { redirect } from "next/navigation"


/**
 * Checks the user's role and redirects to the home page
 * if the user is not an admin. Otherwise, renders the
 * admin home page component.
 *
 * @returns The admin home page or redirects
 * to the home page if the user is not an admin.
 */
const AdminPage = async () => {
    const currentUserRole = await getCurrentUserRole()    
    
    /*
     * If the user's role is not "admin", redirect to the home page.
     */
    if(currentUserRole !== "admin") {
        redirect('/')
    }

    /*
     * If the user is an admin, render the admin home page component.
     */
    return <AdminHomePage />
    }


export default AdminPage
    



