import SignInForm from "@/ui/auth/SignIn"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

const SignIn = async () => {
    const currentUserRole = await getCurrentUserRole()    
    
    if(currentUserRole) {
        redirect('/')
    }
    return <SignInForm />

}

export default SignIn