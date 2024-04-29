import AdminPolls from "@/ui/polls/AdminPolls"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

const PollForm = async ({searchParams} : { searchParams?: {query?: string} }) => {
    const currentUserRole = await getCurrentUserRole()    
    
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    return <AdminPolls query={searchParams?.query!}/>
}


export default PollForm