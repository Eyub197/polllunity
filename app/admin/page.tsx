import { getCurrentUserRole } from "@/lib/utils/user"
import AdminHomePage from "@/ui/admin/AdminHomePage"
import { redirect } from "next/navigation"


const AdminPage = async () => {
    const currentUserRole = await getCurrentUserRole()    
    
    // if(currentUserRole !== "admin") {
    //     redirect('/')
    // }

    return <AdminHomePage />
    }

export default AdminPage
    



