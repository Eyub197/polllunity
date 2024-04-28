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

const PollsPage = ({ searchParams }: searchParamss) => {
    const { categoriq, status, query} = searchParams

    return(
        <>
            <h1 className={styles.page_title}>Изберете за какво да гласувате</h1>
            <section className={styles.filters}>
                <FilterMenu categoryParams={categoriq} statusParams={status}/>
                <Search placeholder="анкета..."/>            
            </section>
            <FramerMotionDiv>
                <main className={styles.main}>
                    <Suspense fallback={<Loader count={3}/>}>
                    <Polls query={query} status={status} filter={categoriq}/>
                    </Suspense>
                </main>             
            </FramerMotionDiv>
        </>
        
    )


}

export default PollsPage