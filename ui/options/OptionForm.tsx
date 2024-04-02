"use client"

import { createOption } from "@/lib/utils/options"
import { Button } from "../ClientButtons"
import ImagePicker from "../components/ImagePicker"
import { useFormState } from "react-dom"
import styles from "@/ui/options/OptionForm.module.css"
import { OptionFormProps } from "@/lib/types"

const OptionForm = ({children,text, poll_id, image}: OptionFormProps ) => {
    const [error, dispatch] = useFormState(createOption, undefined)

    return(
    <form className={styles.form} action={dispatch}>
        <div>
            <label htmlFor="option_text">Текст на опция</label>  
            <input 
            type="text" 
            id="option_text" 
            name="option_text" 
            className={`admin_inputs ${styles.input}`}
            />
        </div>
        {children}
        <div className={styles.image_picker}>
            <ImagePicker  label={"снимка"} name={"image"}/>
        </div>
        <Button className="create_option" action={"Създай"} inAction={"Създава се..."}/>
    </form>
    )
}

export default OptionForm

