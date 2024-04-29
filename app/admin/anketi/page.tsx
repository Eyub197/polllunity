import AdminPolls from "@/ui/polls/AdminPolls"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

/**
 * Renders admin poll page.
 * Checks if the user has admin role, if not redirects to the homepage.
 * @param searchParams Object that contains query search params if any
 * @returns Rendered admin poll page
 */
const PollForm = async ({searchParams} : { searchParams?: {query?: string} }) => {
    const currentUserRole = await getCurrentUserRole()    
    
    // If the user is not admin, redirect him to the homepage
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    // If there are search params, pass them down to the admin page
    return <AdminPolls query={searchParams?.query!}/>
}


export default PollForm