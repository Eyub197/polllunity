"use client"

import styles from "@/ui/categories/Categories.module.css"
import pollStyles from "@/ui/polls/PollForm.module.css"
import ImagePicker from "../components/ImagePicker"
import { createPoll } from "@/lib/utils/polls"
import { Button } from "../ClientButtons"
import { useFormState } from "react-dom"
import ErrorMessage from "../components/ErrorMessage"

const CreatePollForm = () => {

    const checkEndDate = () => {
         if(errorMessage?.message.includes("крайна")) return true
        else if(errorMessage?.message.includes("трябва")) return true
    }

    const [errorMessage, dispatch] = useFormState(createPoll, null)
    
    return(
        <form className={`${styles.form} ${pollStyles.form_grid}`} action={dispatch}>
        <div className={`${styles.name} ${styles.name_poll}`}>
            <label htmlFor="title">Заглавие</label>
            <input 
            type="text"
            id="title"
            name="title"
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
            className={`admin_inputs ${pollStyles.input} `}
            />
            {checkEndDate() && <ErrorMessage className="error_message" errorText={errorMessage?.message} />} 
        </div>
        <div className={pollStyles.category_id}>
            <label htmlFor="category_id">Id на категория</label>
            <input
            type="text"
            id="category_id"
            name="category_id"
            className={`admin_inputs ${pollStyles.input} ${errorMessage?.message.includes("id") && 'input_error'}`}
            />
            {errorMessage?.message.includes('id') && <ErrorMessage className="error_message" errorText={errorMessage.message} />}
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
   
    )
}

export default CreatePollForm