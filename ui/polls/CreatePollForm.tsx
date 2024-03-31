"use client"

import pollStyles from "@/ui/polls/Poll.module.css"
import ImagePicker from "../components/ImagePicker"
import { createPoll } from "@/lib/utils/polls"
import { Button } from "../ClientButtons"
import { useFormState } from "react-dom"
import ErrorMessage from "../components/ErrorMessage"
import { children } from "@/lib/types"

const CreatePollForm = ({ children }: children) => {
    const [error, dispatch] = useFormState(createPoll, undefined, "/admin/polls")

    const checkEndDate = () => {
        if(error?.message.includes("крайна")) return true
        else if(error?.message.includes("трябва")) return true
    }

    const checkTitle = () => {
      if(error?.message.includes("заглавие")) return true  
      else if(error?.message.includes("съществува")) return true      
    }  
    
    return(
        <form className={`${pollStyles.form} ${pollStyles.form_grid}`} action={dispatch}>
        <div className={`${pollStyles.name} ${pollStyles.name_poll}`}>
            <label htmlFor="title">Заглавие</label>
            <input 
            type="text"
            id="title"
            name="title"
            className={`admin_inputs ${pollStyles.input} ${error?.message.includes('заглавие') && 'input_error'  }`}
            />
        {checkTitle() && <ErrorMessage className="error_message" errorText={error?.message} />}
        </div>
        <div className={pollStyles.starts_at}>
            <label htmlFor="starts_at">Започва</label>
            <input 
            type="datetime-local"
            id="starts_at"
            name="starts_at"
            className={`admin_inputs ${pollStyles.input} ${error?.message.includes('стартираща') && 'input_error'  }`}
             />
            {error?.message.includes("стартираща") && <ErrorMessage className="error_message" errorText={error.message} />}
        </div>
        <div className={pollStyles.ends_at}>
            <label htmlFor="ends_at">Завършва</label>
            <input 
            type="datetime-local"
            id="ends_at"
            name="ends_at"
            className={`admin_inputs ${pollStyles.input} ${checkEndDate() && "input_error"}`}
            />
            {checkEndDate() && <ErrorMessage className="error_message" errorText={error?.message} />} 
        </div>
       <ImagePicker name="image" label="ime"/>
        {error?.message.includes("изображение") && <ErrorMessage className="error_message_image" errorText={error.message} />}
        {children}
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
    <Button className="poll_btn" action="Създай" inAction="Създава се..."/>
    </form>
   
    )
}

export default CreatePollForm