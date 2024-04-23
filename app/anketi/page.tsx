import styles from "@/ui/polls/PoolsPage.module.css"
import Polls from "@/ui/polls/Poll/Polls"
import FilterMenu from "@/ui/filterMenu/FilterMenu"
import FramerMotionDiv from "@/ui/components/framerMotion/FramerMotionDiv"
import { Suspense } from "react"
import Loader from "@/ui/skeletons/PollCardSkeleton"

export type searchParamss = {
    searchParams: {
        categoriq : string,
        status: string
    }
}

const PollsPage = ({ searchParams, }: searchParamss) => {
    const { categoriq, status} = searchParams

    return(
        <>
            <h1 className={styles.page_title}>Изберете за какво да гласувате</h1>
            <FilterMenu categoryParams={categoriq} statusParams={status}/>
            <FramerMotionDiv>
            <Suspense fallback={<Loader/>}>
            <main className={styles.main}>
                <Polls status={status} filter={categoriq}/>
            </main>            
            </Suspense>
            </FramerMotionDiv>
        </>
        
    )


}

export default PollsPage