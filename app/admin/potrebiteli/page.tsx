import CreateUser from "@/ui/user/CreateUser"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

/**
 * Users page component
 * 
 * This component renders the user creation page only if the current user
 * has an admin role. If the user is not an admin, it redirects to the home page.
 * 
 * @returns {React.ReactElement} The Users page component
 */
const Users = async () => {
    const currentUserRole = await getCurrentUserRole()    
    
    // If the user is not an admin, redirect to home page
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    
    // If the user is an admin, render the create user form
    return <CreateUser/>
}


export default Users