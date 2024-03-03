import { Suspense } from "react"
import OptionsComponent from "@/ui/options/OptionsComponent"
import Loading from "./loading"
const Test = ({ params }: { params: { id: string } }) => {
    const { id } = params

    return(
    <Suspense fallback={<Loading/>}>
        <OptionsComponent fk={id}/>
    </Suspense>)
}

export default Test

// Todo make a way the user to be able to select only one option 
// Todo after the user selects the option and clicks submit store the option text and make the count + 1 
// Todo redirect them to a page that they have voted successfully