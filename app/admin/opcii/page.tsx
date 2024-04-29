import AdminOptions from "@/ui/options/AdminOptions";
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

/**
 * Renders admin options page.
 * Checks if the user has admin role, if not redirects to the homepage.
 * @param searchParams Object that contains query search params if any
 * @returns Rendered admin options page
 */
const OptionsForm = async ({searchParams} : { searchParams?: {anketa? : string,query?: string} }) => {
    const currentUserRole = await getCurrentUserRole()    
    
    // If the user is not admin, redirect him to the homepage
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    // If there are search params, pass them down to the admin page
    return (
        <AdminOptions
            /**
             * Anketa id. If not provided, all anketas are shown
             */
            anketa={searchParams?.anketa}
            /**
             * Search query. If not provided, all options are shown
             */
            query={searchParams?.query!}
        />
    )
}


    
export default OptionsForm