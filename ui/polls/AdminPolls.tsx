import Image from "next/image"
import CreatePollForm from "./CreatePollForm"
import Dropdown from "../components/dropdown/Dropdown"
import pollStyles from "@/ui/polls/Poll.module.css"
import MoreInformation from "../components/moreInformation/MoreInformation"
import { deletePoll, getPolls } from "@/lib/utils/polls"
import { DeleteButtonServer, EditButton } from "../Buttons"
import { getCategories } from "@/lib/utils/category"

const AdminPolls = async () => {
    const {polls} = await getPolls()
    const {categories} = await getCategories()
    const createPollsElements = () => {

        if(polls?.length! > 0) {
            return polls?.map(poll => {
            const {id, title, starts_at, ends_at, categories, image, description} = poll
            const deleteFunction = deletePoll.bind(null, id, image)    
                console.log(`sniamkate e ${image}`)
            return(
                <div className={pollStyles.poll} key={id}>
                {
                    image && image !== undefined && 
                    <Image
                    width={400}
                    height={300} 
                    src={`https://knefgqtvaywusxthuztg.supabase.co/storage/v1/object/public/images/${image}`}
                    alt={"снимка на анкетата"}
                    className={pollStyles.poll_image}
                    />
                }
                <div className={pollStyles.bottom_part}>
                    <h2>{title}</h2>
                    <div className={pollStyles.info}>
                        <h3>Категория: {categories?.name}</h3>
                        <MoreInformation description={description || "няма допълнителна информация"}/>
                    </div>
                    <p>започва на: {starts_at}</p>
                    <p>завършва на:{ends_at}</p>
                    <div className={pollStyles.buttons}>
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
                    <Dropdown about="category_id" arrayData={categories!} className={"input"} label="Изберете категория" selected={undefined}/>
                </div>
            </CreatePollForm>
            <h2 className={"title_2"}>Всички анкети</h2>
            <section className={pollStyles.polls}>
                {createPollsElements()}
            </section>
        </main>
        </>
    )
}

export default AdminPolls