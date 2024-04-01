import { DeleteButtonServer, EditButton } from "../Buttons"
import Option from "./Option"
import Dropdown from "../components/dropdown/Dropdown"
import OptionForm from "./OptionForm"
import { deleteOption, getOptions } from "@/lib/utils/options"
import { getCurrentPolls } from "@/lib/utils/polls"
import styles from "@/ui/options/OptionForm.module.css"

const AdminOptions = async () => {
    const options = await getOptions()
    const {polls} = await getCurrentPolls()
    const createOptionElements = () => {

        if(options?.length! > 0){
            return (options?.map(option => {
                const deleteFunction = deleteOption.bind(null, option.id)
                
                return(
                    <div key={option.id}>
                        <Option 
                        option_text={option.option_text} 
                        votes_count={option.votes_count} 
                        image={option.image}
                        />
                        <div>
                            <DeleteButtonServer id={option.id} helper={null} action={deleteFunction} />
                            <EditButton id={option.id} toEdit={"options"} />
                        </div>
                    </div>
                    )
                })
            )
        }        
    }    

    return(
        <>
        <h1 className="title">Опции</h1>
        <main className={styles.main}>
            <OptionForm>
                <div>
                    <Dropdown about="poll_id" arrayData={polls!} className={"input"} label="Изберете анкетата" selected={undefined}/>
                </div>
            </OptionForm>
            <h2 className="title_2">Всички опции</h2>
            <section>
                {createOptionElements() || <p>Не сте създали опции</p>}
            </section>
        </main>
        </>
    )
}

export default AdminOptions