import { getPolls } from "@/lib/utils/polls"
import { DeletePollButton, EditPollButton } from "../Buttons"
import pollStyles from "@/ui/polls/PollForm.module.css"
import Image from "next/image"
import CreatePollForm from "./CreatePollForm"
import Dropdown from "../components/dropdown/Dropdown"
import styles from "@/ui/polls/Poll.module.css"
import MoreInformation from "../components/moreInformation/MoreInformation"

const AdminPolls = async () => {
    const polls = await getPolls()

    const createPollsElements = () => {

        if(polls?.length! > 0) {
            return polls?.map(poll => {

            const {id, title, starts_at, ends_at, categories, image, description} = poll
                
            return(
                <div className={styles.poll} key={id}>
                {
                    image && image !== undefined && 
                    <Image
                    width={400}
                    height={300} 
                    src={image}
                    alt={"снимка на анкетата"}
                    className={styles.poll_image}
                    />
                }
                <h2>{title}</h2>
                <h3>Категория: {categories.name}</h3>
                <p>започва на: {starts_at}</p>
                <p>завършва на:{ends_at}</p>
                <MoreInformation description={description}/>
                <DeletePollButton id={id}/>
                <EditPollButton id={id}/>
            </div>)
                      
            })
        }
    }

    return(
        <>
        <h1 className={"title"}>Анкети</h1>
        <main className={pollStyles.main}>
        <CreatePollForm>
            <div className={pollStyles.category_id}>
                <Dropdown className={"input"} label="Изберете категория" selected={undefined}/>
            </div>
        </CreatePollForm>
        <h2 className={"title_2"}>Всички анкети</h2>
        <section className={styles.polls}>
            {createPollsElements()}
        </section>
        </main>
        </>
    )
}

export default AdminPolls