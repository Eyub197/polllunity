import { getPollById } from "@/lib/utils/polls"
import UpdatePoll from "@/ui/polls/UpdatePoll"


const EditPoll = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const  poll  = await getPollById(id)

    return(
        <>       
            <p>{poll?.title}</p>
            <UpdatePoll id={id}/>
        </>
    )
}

export default EditPoll