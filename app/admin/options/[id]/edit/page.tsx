import { getOptionById } from "@/lib/utils/options"
import UpdateOption from "@/ui/options/UpdateOption"

const EditOption = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    const option = await getOptionById(id)

    return(
        <>
            <section>
                <p>{option?.option_text}</p>
            </section>              
            <UpdateOption id={id}/>        
        </>
    )    
}

export default EditOption