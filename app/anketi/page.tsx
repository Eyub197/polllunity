import styles from "@/ui/polls/PoolsPage.module.css"
import Polls from "@/ui/polls/Poll/Polls"
import FilterMenu from "@/ui/filterMenu/FilterMenu"

export type searchParamss = {
    searchParams: {
        categoriq : string
    }
}

const PollsPage = ({ searchParams, }: searchParamss) => {
    const {categoriq} = searchParams

    return(
        <>
            <h1 className={styles.page_title}>Изберете за какво да гласувате</h1>
            <FilterMenu />
            <main className={styles.main}>
                    <Polls filter={categoriq}/>
            </main>
        </>
    )


}

export default PollsPage