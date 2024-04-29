import styles from "@/ui/filterMenu/FilterMenu.module.css"
import { getCurrentPolls } from "@/lib/utils/polls"
import { handleOptionFilter } from "@/lib/utils/options"

export interface SearchParams {
    pollParams : string,
}

const Filter = async ({pollParams} : SearchParams) => {
    const { polls } = await getCurrentPolls()
    return(
        <>
        <form className={styles.dropdown_helper} action={handleOptionFilter}>
            <div className={styles.categories}>
            <label htmlFor="category">Категория</label>
            <select className={styles.select} defaultValue={pollParams} name="poll">
                <option value={"vsicki"}>всички</option>
                {
                polls?.map(poll => 
                <option 
                    key={poll.id}  
                    value={poll.id}
                    >
                    {poll.title}
                </option>
                )}

            </select>
            </div>
            <button className={styles.button}>Филтрирай</button>
        </form>
        </>
    )
}


export default Filter