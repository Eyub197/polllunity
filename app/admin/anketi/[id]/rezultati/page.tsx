import Result from "@/ui/polls/Results/Result"

const Results = ({ params }: { params: { id: string } }) => {
    const { id } = params
    return <Result id={id}/>
}

    
export default Results