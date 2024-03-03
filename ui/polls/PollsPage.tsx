import { getPolls } from "@/lib/utils/polls"
import styles from "@/ui/polls/PoolsPage.module.css"
import Link from "next/link"
import { ChoosePollButton } from "../ClientButtons" 

const PollsPage =  async () => {

    const polls = await getPolls()

    const createPollsElements = () => {
        if(!polls) {
            return(<p>Няма създадени анкети</p>)
        }

        if(polls?.length! > 0){
            return polls?.map(poll => 
                <div className={styles._poll} key={poll.id}>
                    <h2>{poll.title}</h2>
                    <h3>{poll.categories.name}</h3>
                    <p>започва: {poll.starts_at}</p>
                    <p>завършва:{poll.ends_at}</p>
                    <Link href={`anketi/${poll.id}/opcii`}>
                        <ChoosePollButton id={poll.id}/>
                    </Link>
                </div>)
            }
        }

    return(
        <>
            <h1 className={styles.page_title}>Изберете за какво да гласувате</h1>
            <main className={styles.main}>
                    {createPollsElements()}
            </main>
        </>
    )
}

export default PollsPage


/*
===Thinking==== 
do i need onClick? 

*/

