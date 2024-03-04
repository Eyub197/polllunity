import styles from "@/ui/polls/PoolsPage.module.css"
import Link from "next/link"  
import { getPolls } from "@/lib/utils/polls"
import { ChoosePollButton } from "../ClientButtons" 

const PollsPage =  async () => {
    
    const now = new Date()
    const polls = await getPolls()

    const createPollsElements = () => {

        if(!polls) {
            return(<p>Няма създадени анкети</p>)
        }

        if(polls?.length! > 0){

            return polls?.map(poll => {
                const startsAt = new Date(poll.starts_at)
                const endsAt = new Date(poll.ends_at)
                            
                const haveStarted = startsAt < now
                const haveEnded = endsAt < now 
                return ( 
                <div 
                className={`${styles._poll} ${haveStarted && styles.started}  ${ haveEnded && styles.closed  }`}
                key={poll.id}
                >
                    <h2>{poll.title}</h2>
                    <h3>{poll.categories.name}</h3>
                    <p>започва: {poll.starts_at}</p>
                    <p>завършва:{poll.ends_at}</p>
                    <Link href={`anketi/${poll.id}/opcii`}>
                        <ChoosePollButton id={poll.id}/>
                    </Link>
                </div> 
                
                )

                } 
            )}
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




