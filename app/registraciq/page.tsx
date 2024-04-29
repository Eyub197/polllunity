import RegisterForm from "@/ui/auth/RegisterForm"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

/**
 * The register page component
 *
 * This component renders the RegisterForm component if the user is not logged in.
 * If the user is logged in it redirects the user to the home page.
 */
const RegisterFormPage = async () => {
    // Get the current user role
    const currentUserRole = await getCurrentUserRole();

    // If the user is logged in, redirect them to the home page
    if (currentUserRole) {
        redirect('/');
    }

    // Return the RegisterForm component
    return <RegisterForm />;
}

export default RegisterFormPage