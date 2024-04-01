import UpdatePoll from "@/ui/polls/UpdatePoll"
import { getPollById } from "@/lib/utils/polls"
import Dropdown from "@/ui/components/dropdown/Dropdown"
import { getCategories } from "@/lib/utils/category"


const EditPoll = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const  poll  = await getPollById(id)
    const { categories } = await getCategories()
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
            <Dropdown arrayData={categories!} about="category_id" className={"input"} label="Изберете категория" selected={poll?.category_id!} />
            </UpdatePoll>
        </>
    )
}

export default EditPoll