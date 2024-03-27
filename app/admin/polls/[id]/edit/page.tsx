import UpdatePoll from "@/ui/polls/UpdatePoll"
import { getPollById } from "@/lib/utils/polls"


const EditPoll = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const  poll  = await getPollById(id)

    return(
        <>       
            <UpdatePoll 
            id={id} 
            title={poll?.title!}
            ends_at={poll?.ends_at!}
            starts_at={poll?.starts_at!}
            category_id={poll?.category_id!}
            description={poll?.description!}
            />
        </>
    )
}

export default EditPoll