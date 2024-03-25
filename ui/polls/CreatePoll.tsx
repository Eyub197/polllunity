import { createPoll } from "@/lib/utils/polls"
import { getPolls } from "@/lib/utils/polls"
import { DeletePollButton, EditPollButton } from "../buttons"
import styles from "@/ui/categories/Categories.module.css"
import ImagePicker from "../components/ImagePicker"
import Image from "next/image"

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
        <h1 className={styles.title}>Анкети</h1>
        <main>
        <form className={`${styles.form} ${styles.form_grid}`} action={createPoll}>
            <div className={`${styles.name} ${styles.name_poll}`}>
                <label className={styles.label} htmlFor="title">Заглавие</label>
                <input 
                type="text"
                id="title"
                name="title"
                className={`${styles.input} ${false && `${styles.input_error}`  }`}
                />
            </div>
            <div className={styles.starts_at}>
                <label className={styles.label} htmlFor="starts_at">Започва</label>
                <input 
                type="datetime-local"
                id="starts_at"
                name="starts_at"
                className={`${styles.input} `}
                />
            </div>
            <div className={styles.ends_at}>
                <label className={styles.label} htmlFor="ends_at">Завършва</label>
                <input 
                type="datetime-local"
                id="ends_at"
                name="ends_at"
                className={`${styles.input} `}
                />
            </div>
            <div className={styles.category_id}>
                <label className={styles.label} htmlFor="category_id">Id на категория</label>
                <input
                type="text"
                id="category_id"
                name="category_id"
                className={`${styles.input} `}
                />
            </div>
           <ImagePicker name="image" label="ime"/>
            <div className={`${styles.desc} ${styles.desc_poll}`}>
                <label className={styles.label} htmlFor="description">описание</label>
                <textarea
                name="description"
                id="description"
                placeholder="опционално описание..."
                className={styles.input_description}
                > 
                </textarea>
            </div>

            <button className={styles.poll_btn}>action</button>
        </form>
        <h2 className={styles.title_2}>Всички анкети</h2>
        <section>
            {createPollsElements()}
        </section>
        </main>
        </>
    )
}

export default CreatePoll