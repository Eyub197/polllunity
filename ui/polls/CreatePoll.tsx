import { createPoll } from "@/lib/utils/polls"
import { getPolls } from "@/lib/utils/polls"
import { DeletePollButton, EditPollButton } from "../Buttons"
import styles from "@/ui/categories/Categories.module.css"
import pollStyles from "@/ui/polls/PollForm.module.css"
import ImagePicker from "../components/ImagePicker"
import Image from "next/image"
import { Button } from "../ClientButtons"

const CreatePoll = async () => {
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
                <EditPollButton id= {id}/>
            </div>)
                      
            })
        }
    }

    return(
        <>
        <h1 className={"title"}>Анкети</h1>
        <main className={pollStyles.main}>
        <form className={`${styles.form} ${pollStyles.form_grid}`} action={createPoll}>
            <div className={`${styles.name} ${styles.name_poll}`}>
                <label htmlFor="title">Заглавие</label>
                <input 
                type="text"
                id="title"
                name="title"
                className={`admin_inputs ${pollStyles.input} ${false && 'input_error'  }`}
                />
            </div>
            <div className={pollStyles.starts_at}>
                <label htmlFor="starts_at">Започва</label>
                <input 
                type="datetime-local"
                id="starts_at"
                name="starts_at"
                className={`admin_inputs ${pollStyles.input} `}
                />
            </div>
            <div className={pollStyles.ends_at}>
                <label htmlFor="ends_at">Завършва</label>
                <input 
                type="datetime-local"
                id="ends_at"
                name="ends_at"
                className={`admin_inputs ${pollStyles.input} `}
                />
            </div>
            <div className={pollStyles.category_id}>
                <label htmlFor="category_id">Id на категория</label>
                <input
                type="text"
                id="category_id"
                name="category_id"
                className={`admin_inputs ${pollStyles.input} `}
                />
            </div>
           <ImagePicker name="image" label="ime"/>
            <div className={`${pollStyles.desc_poll}`}>
                <label htmlFor="description">описание</label>
                <textarea
                name="description"
                id="description"
                placeholder="опционално описание..."
                className={`admin_inputs ${pollStyles.input_description} input_description`}
                > 
                </textarea>
            </div>
        <Button className="poll_btn" action="създай" inAction="създава се..."/>
        </form>
        <h2 className={"title_2"}>Всички анкети</h2>
        <section>
            {createPollsElements()}
        </section>
        </main>
        </>
    )
}

export default CreatePoll