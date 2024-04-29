"use client"

import pollStyles from "@/ui/polls/Poll.module.css"
import ImagePicker from "../components/ImagePicker"
import ErrorMessage from "../components/ErrorMessage"
import { createPoll, updatePollById } from "@/lib/utils/polls"
import { Button } from "../ClientButtons"
import { useFormState } from "react-dom"
import { PollFormsProps } from "@/lib/types"

/**
 * This component is used to create or update a poll.
 * Depending on the action prop, it will call the updatePollById or createPoll functions from polls.
 * The error is handled and displayed below the inputs.
 * The action and id props are used to determine which function to call.
 * The image prop is used to preload the image in the ImagePicker.
 * The rest of the props are used as default values for the inputs.
 */
const PollForm = ({ children,
    title,
    image,
    description,
    starts_at,
    ends_at,
    action, // Indicates if this is an update or a create action
    id, // The id of the poll to be updated
}: PollFormsProps,) => {

    /**
     * The function to be called based on the action prop.
     * It is bound to the id and image to be passed as arguments.
     */
    const update = updatePollById.bind(null, id!, image)
    /**
     * The useFormState hook is used to handle the form submission.
     * The first element is the error, the second is the dispatch function.
     */
    const [errorUpdate, dispatchUpdate] = useFormState(update, undefined)
    const [errorCreate, dispatchCreate] = useFormState(createPoll, undefined)

    /**
     * The function to be called based on the action prop.
     * It is either the update or create function.
     */
    const dispatch = action === "update" ? dispatchUpdate : dispatchCreate
    /**
     * The error based on the action prop.
     * It is either the update or create error.
     */
    const error = action === "update" ? errorUpdate : errorCreate
    /**
     * The button text based on the action prop.
     * It is either "Обнови" or "Създай".
     */
    const buttonActionText = action === "update" ? "Обнови" : "Създай"
    /**
     * The button text in action based on the action prop.
     * It is either "Обновяване" or "Създава се".
     */
    const buttonInActionText = action === "update" ? "Обновяване" : "Създава се"

    /**
     * Checks if the end date input has an error based on the error message.
     * If the message includes "крайна" or "трябва" it returns true.
     */
    const checkEndDate = (): boolean => {
        if (error?.message.includes("крайна")) return true
        else if (error?.message.includes("трябва")) return true
        return false
    }

    /**
     * Checks if the title input has an error based on the error message.
     * If the message includes "заглавие" or "съществува" it returns true.
     */
    const checkTitle = (): boolean => {
        if (error?.message.includes("заглавие")) return true
        else if (error?.message.includes("съществува")) return true
        return false
    }

    /**
     * Checks if the image input has an error based on the error message.
     * If the message includes "2" it returns true.
     */
    const checkImage = (): boolean => {
        if (error?.message.includes("2")) return true
        return false
    }

    return (
        <form className={`${pollStyles.form} ${pollStyles.form_grid}`} action={dispatch}>
            <div className={`${pollStyles.name} ${pollStyles.name_poll}`}>
                <label htmlFor="title">Заглавие</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className={`admin_inputs ${pollStyles.input} ${error?.message.includes('заглавие') && 'input_error'}`}
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
                    className={`admin_inputs ${pollStyles.input} ${error?.message.includes('стартираща') && 'input_error'}`}
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
            <ImagePicker picture={image} name="image" label="ime" />
            {checkImage() && <ErrorMessage className="error_message_image" errorText={error?.message} />}
            {children}
            <div className={`${pollStyles.desc_poll}`}>
                <label htmlFor="description">описание</label>
                <textarea
                    name="description"
                    id="description"
                    placeholder="опционално описание..."
                    className={`admin_inputs  ${pollStyles.input_description} input_description`}
                    defaultValue={description && description}
                >
                </textarea>
            </div>
            <Button className="poll_btn" action={buttonActionText} inAction={buttonInActionText} />
        </form>
    )
}

export default PollForm