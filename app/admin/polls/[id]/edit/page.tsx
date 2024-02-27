import { getPollById } from "@/lib/utils/polls"
import UpdatePoll from "@/ui/polls/UpdatePoll"


const EditPoll = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const {title, start_at} = await getPollById(id)

    return(
        <>       
         <p>{title}</p>
        <UpdatePoll id={id}/>
        </>
    )
}

export default EditPoll