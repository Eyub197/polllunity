import styles from "@/ui/polls/PoolsPage.module.css"
import Polls from "@/ui/polls/Poll/Polls"
import FilterMenu from "@/ui/filterMenu/FilterMenu"
import FramerMotionDiv from "@/ui/components/framerMotion/FramerMotionDiv"
import Loader from "@/ui/skeletons/PollCardSkeleton"
import Search from "@/ui/components/Search/Search"
import { Suspense } from "react"

export type searchParamss = {
    searchParams: {
        categoriq : string,
        status: string,
        query?: string
    }
}

/**
 * This is the main component for the polls page.
 * It renders the polls page title, the search and filter menu,
 * and the actual polls based on the search and filter parameters.
 */
const PollsPage = ({ searchParams }: searchParamss) => {
    // destructure the search and filter parameters from the prop
    const { categoriq, status, query } = searchParams

    return (
        // return a fragment and add the page title
        <><h1 className={styles.page_title}>Изберете за какво да гласувате</h1>
        {/* add a section for the search and filter menu */}
        <section className={styles.filters}>
            {/* render the filter menu component and pass in the category and status parameters */}
            <FilterMenu categoryParams={categoriq} statusParams={status}/>
            {/* render the search component with a placeholder for the input */}
            <Search placeholder="анкета..."/>
        </section>
        {/* render the framer motion div */}
        <FramerMotionDiv>
            {/* add a main tag and render the polls component inside it */}
            <main className={styles.main}>
                {/* wrap the polls component in a suspense component for lazy loading */}
                <Suspense fallback={<Loader count={3}/>}>
                    <Polls 
                        // pass in the query and filter parameters to the polls component
                        query={query} status={status} filter={categoriq}
                    />
                </Suspense>
            </main>
        </FramerMotionDiv>
        </>
    )
}



export default PollsPage