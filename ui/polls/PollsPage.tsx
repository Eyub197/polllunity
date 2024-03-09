import styles from "@/ui/polls/PoolsPage.module.css"
import Poll from "./Poll/Poll"
import { getPolls } from "@/lib/utils/polls"
import { ChoosePollButton } from "../buttons" 
import { createClient } from "@/lib/supabase/server"
import { getUserVote } from "@/lib/utils/userVote"

export const dynamic = 'force-dynamic'

const PollsPage =  async () => {
    
    const polls = await getPolls()
    const supabase = await createClient()
    const { data : { user }, error } = await supabase.auth.getUser()


    return(
        <>
            <h1 className={styles.page_title}>Изберете за какво да гласувате</h1>
            <main className={styles.main}>
                {
                polls && polls.length > 0 && polls.map(poll => (
                <Poll key={poll.id} poll={poll} user={user}/>))
                }
            </main>
        </>
    )
}

export default PollsPage




