"use client"

import styles from "@/ui/categories/Categories.module.css"
import ImagePicker from "../components/ImagePicker"
import pollStyles from "@/ui/polls/PollForm.module.css"
import ErrorMessage from "../components/ErrorMessage"
import { updatePollById } from "@/lib/utils/polls"
import { Poll } from "@/lib/types"
import { useFormState } from "react-dom"
import { Button } from "../ClientButtons"
import ChooseCategory from "../components/ChooseCategory/ChooseCategory"

const UpdatePoll = ({id, title, starts_at, ends_at, category_id,children, description}: Poll) => {
    
    const checkEndDate = () => {
        if(errorMessage?.message.includes("крайна")) return true
       else if(errorMessage?.message.includes("трябва")) return true
    }

    const updatePoll = updatePollById.bind(null, id)
    const [errorMessage, dispatch] = useFormState(updatePoll, undefined, "/admin/polls")
    return(
    <main className={styles.main}>
        <form className={`${styles.form} ${pollStyles.form_grid}`} action={dispatch}>
        <div className={`${styles.name} ${styles.name_poll}`}>
            <label htmlFor="title">Заглавие</label>
            <input 
            type="text"
            id="title"
            name="title"
            defaultValue={title}
            className={`admin_inputs ${pollStyles.input} ${errorMessage?.message.includes('заглавие') && 'input_error'  }`}
            />
        {errorMessage?.message.includes("заглавие") && <ErrorMessage className="error_message" errorText={errorMessage.message} />}
        </div>
        <div className={pollStyles.starts_at}>
            <label htmlFor="starts_at">Започва</label>
            <input 
            type="datetime-local"
            id="starts_at"
            name="starts_at"
            defaultValue={starts_at}
            className={`admin_inputs ${pollStyles.input} `}
            />
            {errorMessage?.message.includes("стартираща") && <ErrorMessage className="error_message" errorText={errorMessage.message} />}
        </div>
        <div className={pollStyles.ends_at}>
            <label htmlFor="ends_at">Завършва</label>
            <input 
            type="datetime-local"
            id="ends_at"
            name="ends_at"
            defaultValue={ends_at}
            className={`admin_inputs ${pollStyles.input} `}
            />
            {checkEndDate() && <ErrorMessage className="error_message" errorText={errorMessage?.message} />} 
        </div>
        <div className={pollStyles.category_id}>
            {children}
        </div>
       <ImagePicker name="image" label="ime"/>
        <div className={`${pollStyles.desc_poll}`}>
            <label htmlFor="description">описание</label>
            <textarea
            name="description"
            id="description"
            placeholder="опционално описание..."
            defaultValue={description}
            className={`admin_inputs ${pollStyles.input_description} input_description`}
            > 
            </textarea>
        </div>
    <Button className="poll_btn" action="редактирай" inAction="редактира се..."/>
    </form>
    </main>
    )
}

export default UpdatePoll