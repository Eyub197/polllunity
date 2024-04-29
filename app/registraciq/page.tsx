import RegisterForm from "@/ui/auth/RegisterForm"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

const RegisterFormPage = async () =>{
    const currentUserRole = await getCurrentUserRole()    
    
    if(currentUserRole) {
        redirect('/')
    }
    
    return <RegisterForm/> 
} 

export default RegisterFormPage