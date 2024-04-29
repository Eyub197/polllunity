"use client"

import { createOption, updateOptionById } from "@/lib/utils/options"
import { Button } from "../ClientButtons"
import ImagePicker from "../components/ImagePicker"
import { useFormState } from "react-dom"
import styles from "@/ui/options/OptionForm.module.css"
import { OptionFormProps } from "@/lib/types"

/**
 * OptionForm - Component for creating or updating an option
 * @param children - Child components that will be rendered below the form
 * @param text - Default value for the text field. If id is set, the current text will be used
 * @param image - Default value for the image field. If id is set, the current image will be used
 * @param id - If set, the component will be used for updating an option.
 * @param action - If set to 'update', the component will be used for updating an option.
 */
const OptionForm = ({children, text, image, id, action}: OptionFormProps) => {
    /**
     * Function that will be used for creating or updating an option
     * It is binded to the id and image parameters
     * @param id - ID of the option
     * @param image - Image of the option
     */
    const updateOption = updateOptionById.bind(null, id!, image)

    /**
     * State of creating a new option
     * The first item is the error of creating
     * The second item is the dispatch function for creating
     */
    const [errorCreate, dispatchCreate] = useFormState(createOption, undefined)

    /**
     * State of updating an option
     * The first item is the error of updating
     * The second item is the dispatch function for updating
     */
    const [errorUpdate, dispatchUpdate] = useFormState(updateOption, undefined)

    /**
     * Function that will be used for creating or updating an option
     * It will be dispatchCreate for creating and dispatchUpdate for updating
     */
    const dispatch = action === "update" ? dispatchUpdate : dispatchCreate

    /**
     * Error of creating or updating an option
     * It will be errorCreate for creating and errorUpdate for updating
     */
    const error = action === "update" ? errorUpdate : errorCreate

    /**
     * Text that will be shown on the button for creating or updating
     * It will be 'Обнови' for updating and 'Създай' for creating
     */
    const buttonActionText = action === "update" ? "Обнови" : "Създай"

    /**
     * Text that will be shown while the button is in action
     * It will be 'Обновяване' for updating and 'Създава се' for creating
     */
    const buttonInActionText = action === "update" ? "Обновяване" : "Създава се"

    /**
     * Function that will return true if the error contains the string 'текст' or 'опция'
     */
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

