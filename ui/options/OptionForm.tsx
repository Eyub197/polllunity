"use client"

import { createOption, updateOptionById } from "@/lib/utils/options"
import { Button } from "../ClientButtons"
import ImagePicker from "../components/ImagePicker"
import { useFormState } from "react-dom"
import styles from "@/ui/options/OptionForm.module.css"
import { OptionFormProps } from "@/lib/types"

const OptionForm = ({children,text, image, id, action}: OptionFormProps ) => {
    const updateOption = updateOptionById.bind(null, id!, image)
   
    const [errorCreate, dispatchCreate] = useFormState(createOption, undefined)
    const [errorUpdate, dispatchUpdate] = useFormState(updateOption, undefined)

    const dispatch = action === "update"? dispatchUpdate : dispatchCreate
    const error = action === "update"? errorUpdate : errorCreate
    const buttonActionText = action === "update"? "Обнови" : "Създай"
    const buttonInActionText = action === "update"? "Обновяване..." : "Създава се..."


    const checkText = () => {
        return error?.message.includes("текс") 
        || error?.message.includes("опция")
    }

    return(
    <form className={styles.form} action={dispatch}>
        <div className={styles.option_input}>
            <label htmlFor="option_text">Текст на опция</label>  
            <input 
            type="text" 
            id="option_text" 
            name="option_text" 
            className={`admin_inputs  ${styles.input} ${checkText() && 'input_error'} `}
            defaultValue={text || ""}
            />
            <div className={styles.error_container}>
             {checkText() && <p className={styles.error}>{error?.message }</p>}        
            </div>
        </div>
        {children}
        <div className={styles.image_picker}>
            <ImagePicker picture={image} label={"снимка"} name={"image"}/>
            {error?.message.includes("2") && <p className={styles.error}>{error.message }</p>}        
        </div>
        <Button className="create_option" action={buttonActionText} inAction={buttonInActionText}/>
    </form>
    )
}

export default OptionForm

