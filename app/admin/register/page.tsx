import RegisterForm from "@/ui/forms/registerForm"
import { Suspense } from "react"

const RegisterFormPage = () => <Suspense fallback={<p>Loading...</p>}> <RegisterForm/> </Suspense>

export default RegisterFormPage