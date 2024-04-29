import AdminOptions from "@/ui/options/AdminOptions";
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

const OptionsForm = async ({searchParams} : { searchParams?: {anketa? : string,query?: string} }) => {
    const currentUserRole = await getCurrentUserRole()    
    
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    
    return <AdminOptions anketa={searchParams?.anketa} query={searchParams?.query!}/>
}


    
export default OptionsForm