import { getCategories } from "@/lib/utils/category"
import { createClient } from "@/lib/supabase/server"
import { getPolls } from "@/lib/utils/polls"
import Poll from "./Poll"

interface Filter {
   filter: string
}

const Polls = async ({filter} : Filter  ) => {
    const supabase = await createClient()
    const { data : { user }, error } = await supabase.auth.getUser()
    let polls = await getPolls()
    
    polls = polls || []
    
    if(filter && filter !== "всички")
        polls = polls?.filter(poll =>  poll.category_id === filter )
     
    
    const pollsElement = () => {
        return polls?.map(poll => <Poll key={poll.id} poll={poll} user={user}/>)
    }


    return(
        <>
            {
                polls ?  pollsElement(): <p>Няма създадени анкети</p>
            }        
        </>

    )
}

export default Polls
    
    
