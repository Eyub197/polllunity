import { deletePoll, getPolls } from "@/lib/utils/polls"
import { DeleteButtonServer, EditButton } from "../Buttons"
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
            return polls?.map( poll => {

            const {id, title, starts_at, ends_at, categories, image, description} = poll
            const deleteFunction = deletePoll.bind(null, id)    
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
                <div className={styles.bottom_part}>
                    <h2>{title}</h2>
                    <div className={styles.info}>
                        <h3>Категория: {categories.name}</h3>
                        <MoreInformation description={description}/>
                    </div>
                    <p>започва на: {starts_at}</p>
                    <p>завършва на:{ends_at}</p>
                    <div className={styles.buttons}>
                        <EditButton id={id} toEdit="polls"/>
                        <DeleteButtonServer action={deleteFunction} id={id} helper={null}/>
                    </div>
                </div>
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