import CreateUser from "@/ui/user/CreateUser"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

const Users = async () => {
    const currentUserRole = await getCurrentUserRole()    
    
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    
    return <CreateUser/>
}

export default Users