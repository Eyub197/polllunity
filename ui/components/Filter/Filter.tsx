import styles from "@/ui/filterMenu/FilterMenu.module.css"
import { getCurrentPolls } from "@/lib/utils/polls"
import { handleOptionFilter } from "@/lib/utils/options"

export interface SearchParams {
    pollParams : string,
}

/**
 * Component for filtering the admin options page.
 * Gets the list of polls and renders a form with select
 * for filtering by poll.
 * When the form is submitted, it calls the handleOptionFilter function
 * from the utils/options module.
 * @param pollParams The selected poll from the form
 * @returns The component for filtering the admin options page
 */
const Filter = async ({pollParams} : SearchParams) => {
    const { polls } = await getCurrentPolls() // get the list of polls

    return(
        <>
        {/* render the form for filtering */}
        <form
            className={styles.dropdown_helper} // add the dropdown_helper class to the form
            action={handleOptionFilter} // call the handleOptionFilter function when form is submitted
        >
            <div className={styles.categories}>
                {/* add label and select tags for filtering by poll */}
                <label htmlFor="category">Категория</label>
                <select
                    className={styles.select} // add the select class to the select tag
                    defaultValue={pollParams} // set the default value of the select to the pollParams
                    name="poll" // set the name attribute of the select to "poll"
                >

                    <option value={"vsicki"}>всички</option> {/* add the "всички" option */}
                    {
                        polls?.map(poll => 
                            <option 
                                key={poll.id} // set the key of the option to the poll id
                                value={poll.id} // set the value of the option to the poll id
                            >
                                {poll.title} {/* set the text of the option to the poll title */}
                            </option>
                        )
                    }

                </select>
            </div>
            <button className={styles.button}>Филтрирай</button> {/* add the button for submitting the form */}
        </form>
        </>
    )
}



export default Filter