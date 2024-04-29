import Result from "@/ui/polls/Results/Result"

/**
 * The component for the route /anketi/[id]/rezultati
 * 
 * This component renders the Result component with the id from the url
 */
const Results = ({ params }: { params: { id: string } }) => {
    // destructure the id from the url params
    const { id } = params;
    // render the Result component with the id as a prop
    return <Result id={id}/>
    // The Result component will fetch the poll with this id and render the results
}

    
export default Results