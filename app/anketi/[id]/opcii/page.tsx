import { Suspense } from "react"
import OptionsComponent from "@/ui/options/OptionsComponent"
import Loading from "./loading"


const VotingPage = ({ params }: { params: { id: string } }) => {
    const { id } = params

    return(
    <Suspense fallback={<Loading/>}>
        <OptionsComponent fk={id}/>
    </Suspense>

    )
}

export default  VotingPage

