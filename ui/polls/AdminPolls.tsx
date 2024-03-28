import { getPolls } from "@/lib/utils/polls"
import { DeletePollButton, EditPollButton } from "../Buttons"
import pollStyles from "@/ui/polls/PollForm.module.css"
import Image from "next/image"
import CreatePollForm from "./CreatePollForm"
import Dropdown from "../components/dropdown/Dropdown"

const AdminPolls = async () => {
    const polls = await getPolls()

    const createPollsElements = () => {

        if(polls?.length! > 0) {
            return polls?.map(poll => {

            const {id, title, starts_at, ends_at, categories, image, description} = poll
                
            return(
                <div key={id}>
                {
                    image && image !== undefined && 
                    <Image 
                    src={image}
                    width={200}
                    height={100}
                    style={{objectFit: "cover"}}
                    alt={"снимка на анкетата"}
                    />
                  }
                <h2>title: {title}</h2>
                <h3>{categories.name}</h3>
                <p>starts at: {starts_at}</p>
                <p>ends at :{ends_at}</p>
                <p>{description}</p>
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
            <Dropdown label="Изберете категория" selected={undefined}/>
        </CreatePollForm>
        <h2 className={"title_2"}>Всички анкети</h2>
        <section>
            {createPollsElements()}
        </section>
        </main>
        </>
    )
}

export default AdminPolls