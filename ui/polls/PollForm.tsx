"use client"

import pollStyles from "@/ui/polls/Poll.module.css"
import ImagePicker from "../components/ImagePicker"
import { createPoll, updatePollById } from "@/lib/utils/polls"
import { Button } from "../ClientButtons"
import { useFormState } from "react-dom"
import ErrorMessage from "../components/ErrorMessage"

export interface PollFormsProps {
    children: React.ReactNode;
    id?:string;
    action : "update" | "create";
    title?: string;
    image?: string;
    description?: string;
    starts_at?: string;
    ends_at?: string;
    category_id?: string;    

}   


const PollForm = ({ children, title, image, description, starts_at, ends_at, category_id, action, id }: PollFormsProps,) => {

    const update = updatePollById.bind(null, id!)
    const [errorUpdate, dispatchUpdate] = useFormState(update , undefined)
    const [error, dispatch] = useFormState(createPoll , undefined)

    const chooseDispatch = action === "update"? dispatchUpdate : dispatch
    
    const checkEndDate = () => {
        if(error?.message.includes("крайна")) return true
        else if(error?.message.includes("трябва")) return true
    }

    const checkTitle = () => {
      if(error?.message.includes("заглавие")) return true  
      else if(error?.message.includes("съществува")) return true      
    }  
    
    return(
        <form className={`${pollStyles.form} ${pollStyles.form_grid}`} action={chooseDispatch}>
        <div className={`${pollStyles.name} ${pollStyles.name_poll}`}>
            <label htmlFor="title">Заглавие</label>
            <input 
            type="text"
            id="title"
            name="title"
            className={`admin_inputs ${pollStyles.input} ${error?.message.includes('заглавие') && 'input_error'  }`}
            defaultValue={title && title}
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
            defaultValue={starts_at && starts_at}
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
            defaultValue={ends_at && ends_at}
            />
            {checkEndDate() && <ErrorMessage className="error_message" errorText={error?.message} />} 
        </div>
       <ImagePicker picture={image} name="image" label="ime"/>
        {error?.message.includes("изображение") && <ErrorMessage className="error_message_image" errorText={error.message} />}
        {children}
        <div className={`${pollStyles.desc_poll}`}>
            <label htmlFor="description">описание</label>
            <textarea
            name="description"
            id="description"
            placeholder="опционално описание..."
            className={`admin_inputs ${pollStyles.input_description} input_description`}
            defaultValue={description && description}
            > 
            </textarea>
        </div>
    <Button className="poll_btn" action="Създай" inAction="Създава се..."/>
    </form>
    )
}

export default PollForm