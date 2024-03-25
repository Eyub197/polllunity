import SignInForm from "@/ui/forms/SignIn"
import { Suspense } from "react"
import Loading from "./loading"

const SignIn = () => <Suspense fallback={<Loading />}>  <SignInForm /></Suspense>

export default SignIn