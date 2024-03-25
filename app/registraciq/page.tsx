import RegisterForm from "@/ui/auth/RegisterForm"
import { Suspense } from "react"

const RegisterFormPage = () => <Suspense fallback={<p>Loading...</p>}> <RegisterForm/> </Suspense>

export default RegisterFormPage