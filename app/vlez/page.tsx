import SignInForm from "@/ui/auth/SignIn"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

/**
 * The Sign In page component.
 *
 * This component renders the sign in form.
 * If the current user is already signed in,
 * redirect to the home page ('/')
 *
 * @returns {JSX.Element} The sign in page component
 */
const SignIn = async () => {
    const currentUserRole = await getCurrentUserRole()

    /* If the user is already signed in, redirect to the home page */
    if (currentUserRole) {
        redirect('/')
    }

    /* Render the sign in form */
    return <SignInForm />
}


export default SignIn