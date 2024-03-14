import { createClient } from "@/lib/supabase/server"
import { getPolls } from "@/lib/utils/polls"
import Poll from "./Poll"
import { motion } from "framer-motion"

interface Filter {
   filter: string,
   status: string
}

const Polls = async ({filter, status} : Filter  ) => {
 
    const supabase = await createClient()

    const { data : { user }, error } = await supabase.auth.getUser()
    
    let polls = await getPolls() || []

    if(filter && filter !== "vsicki") 
       polls = polls?.filter(poll =>  poll.category_id === filter )
         
    const pollsElement = () => {
        return (
         
            polls?.map(poll =>  <Poll status={status} key={poll.id} poll={poll} user={user}/>)
            
            )
    }
    
    return <> {polls ?  pollsElement() : <p>Няма създадени анкети</p>} </>

}

export default Polls
    
    
