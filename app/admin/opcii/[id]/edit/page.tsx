import { getOptionById, getPollDropDownInfo } from "@/lib/utils/options"
import Dropdown from "@/ui/components/dropdown/Dropdown"
import OptionForm from "@/ui/options/OptionForm"
import styles from "@/ui/options/OptionHelper.module.css"

const EditOption = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    const option = await getOptionById(id)
    const polls = await getPollDropDownInfo()
    return(
        <main className={styles.main}>
            <section className={styles.edit_option}>
                <p>Опцията: {option?.option_text}</p>
            </section>              
            <OptionForm 
            action="update" 
            id={id}
            text={option?.option_text}
            image={option?.image!}
            poll_id={option?.poll_id!}
            >
                <div>
                    <Dropdown about="poll_id" arrayData={polls!} className={"input"} label="Изберете анкетата" selected={option?.poll_id}/>
                </div>    
            </OptionForm>                     
        </main>
    )    
}

export default EditOption