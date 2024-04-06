import { createClient } from "@/lib/supabase/server"
import { getPolls } from "@/lib/utils/polls"
import Image from "next/image"
import styles from "@/ui/polls/Poll/Polls.module.css"

interface Filter {
   filter: string,
   status: string
}

const Polls = async ({filter, status} : Filter  ) => {
 
    const supabase = await createClient()

    const { data : { user }, error } = await supabase.auth.getUser()
    
    let { polls } = (await getPolls() || [])

    if(filter && filter !== "vsicki") {
        polls = (polls || []).filter(poll => poll.category_id === filter )
    }
    if(status && status !== "vsicki") {
        polls = (polls || []).filter(poll => poll.status === status )
    }
             
    const pollsElement = () => {
        if(!polls?.length || polls?.length < 1) return <p>Няма анкети с тези филтри</p>
        
        
        return (
            polls?.map(poll => 
                <div key={poll.id} className={styles.poll}> 
                    <section className={styles.image_container}>
                    <img
                    width={400}
                    height={200}
                    className={styles.image}
                    src={`https://knefgqtvaywusxthuztg.supabase.co/storage/v1/object/public/images/${poll.image}`}
                    alt={"снимка на анкетата"}
                    style={{objectFit: "cover"}}
                    />

                    </section>
                    <section className={styles.bottom_part}>
                        <h2>{poll.title}</h2>
                        <h3>{poll.description}</h3>
                        <p>{poll.starts_at}</p>
                        <p>{poll.ends_at}</p>
                        <p>{poll.categories?.name}</p>
                    </section>
                </div> 
            
            )
        )
    }
    
    return pollsElement()
}

export default Polls
    
    
