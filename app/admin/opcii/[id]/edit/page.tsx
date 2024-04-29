import { getOptionById, getPollDropDownInfo } from "@/lib/utils/options"
import Dropdown from "@/ui/components/dropdown/Dropdown"
import OptionForm from "@/ui/options/OptionForm"
import styles from "@/ui/options/OptionHelper.module.css"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"


/**
 * This page renders a form for editing an option.
 * 
 * It fetches the option's information and a list of all polls from the
 * server. Based on the information it renders the form and the dropdown
 * list with all polls.
 * 
 * If the user is not an admin, it redirects to the home page.
 */
const EditOption = async ({ params }: { params: { id: string } }) => {
    // Get the option's info and a list of all polls from the server
    const { id } = params
    const option = await getOptionById(id)
    const polls = await getPollDropDownInfo()
    const currentUserRole = await getCurrentUserRole()

    // If the user is not an admin, redirect to the home page
    if(currentUserRole !== "admin") {
        redirect('/')
    }

    // Render the form with the option's data and the dropdown list of all polls
    return(
        <main className={styles.main}>
            <section className={styles.edit_option}>
                <p>The option: {option?.option_text}</p>
            </section>              
            <OptionForm 
            /** 
             * The form's action - update in this case.
             */
            action="update" 
            /**
             * The option's id.
             */
            id={id}
            /**
             * The option's text.
             */
            text={option?.option_text}
            /**
             * The option's image - may be null.
             */
            image={option?.image!}
            /**
             * The option's poll id.
             */
            poll_id={option?.poll_id!}
            >
                <div>
                    <Dropdown 
                    /**
                     * The dropdown's label.
                     */
                    about="poll_id"
                    /**
                     * An array of objects with the poll's id and name.
                     */
                    arrayData={polls!}
                    /**
                     * The dropdown's CSS class.
                     */
                    className={"input"}
                    /**
                     * The dropdown's label.
                     */
                    label="Select the poll"
                    /**
                     * The selected option's id.
                     */
                    selected={option?.poll_id}
                    />
                </div>    
            </OptionForm>                     
        </main>
    )    
}

export default EditOption