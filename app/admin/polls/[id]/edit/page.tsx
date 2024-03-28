import UpdatePoll from "@/ui/polls/UpdatePoll"
import { getPollById } from "@/lib/utils/polls"
import DropDown from "@/ui/components/dropdown/Dropdown"


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
            >
            <DropDown label="Изберете категория" selected={poll?.category_id!} />
            </UpdatePoll>
        </>
    )
}

export default EditPoll