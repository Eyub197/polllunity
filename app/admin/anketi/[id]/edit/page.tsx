import { getPollById } from "@/lib/utils/polls"
import Dropdown from "@/ui/components/dropdown/Dropdown"
import { getCategories } from "@/lib/utils/category"
import PollForm from "@/ui/polls/PollForm"
import styles from "@/ui/polls/Poll.module.css"

const EditPoll = async ({ params }: { params: { id: string } }) => {
    const { id } = params    
    const  {polls}  = await getPollById(id)
    const  {categories}  = await getCategories()
    return(
        <main className={styles.main}>       
            <PollForm
            action="update"
            title={polls?.title}
            image={polls?.image!}
            id={id}
            >
            
            <div className={styles.category_id}>
                <Dropdown  about="category_id" arrayData={categories!} className={"input"} label="Изберете категория" selected={undefined}/>
            </div>
            </PollForm>
        </main>
    )
}

export default EditPoll