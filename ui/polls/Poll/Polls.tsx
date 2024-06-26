import Image from "next/image"
import noPolls from "@/public/noPolls.webp"
import styles from "@/ui/polls/Poll/Polls.module.css"
import ButtonLink from "@/ui/components/buttonLink/ButtonLink"
import { createClient } from "@/lib/supabase/server"
import { getPolls } from "@/lib/utils/polls"
import { formatDate } from "@/lib/utils/helperFunctions"
import { MotionDiv } from "@/ui/components/framerMotion/FramerMotionDiv"

interface Filter {
    filter: string,
    status: string,
    query?: string
}



// polls page component with logic for handling statuses

const Polls = async ({query,filter, status} : Filter  ) => {
    const supabase = await createClient()

    const { data : { user }, error } = await supabase.auth.getUser()
    const { polls } = (await getPolls(query, status, filter) || [])
    
    const manageButtons = (pollStatus: string, id:string) => {
        if(!user) {
        return  <div className="ds-f">
        <ButtonLink className="register"to={"/registraciq"}>Регистрирайте се</ButtonLink> 
        <ButtonLink to="/vlez" className="login">Вход</ButtonLink>
        </div>                 
        } 
        if(pollStatus === "zapocnala" ) {
            return <div className="tx-c">
            <ButtonLink className="chose_vote" to={`anketi/${id}/opcii`}>
                Гласувайте
            </ButtonLink>
            </div>
        }
        if(pollStatus === "nezapocnala"){
            return <div className="tx-c">
                <ButtonLink className="see_votes" to={`anketi/${id}/opcii`}>Погледнете опциите</ButtonLink>                
                </div>
        } 
        else {
            return <div className="tx-c">
                <ButtonLink to={`anketi/${id}/rezultati`} className="check_results">
                    Погледнете резултатите
                </ButtonLink>
                </div>
        } 
    }

    const pollsElement = () => {
        if(!polls?.length || polls?.length < 1) return (
        <section className={styles.no_polls_container}>
        <Image 
        src={noPolls}
        alt="нема анкети с тези филтри"
        style={{
            maxWidth: "400px",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto"
        }}
        />

        <p className={styles.no_polls}> Няма анкети с тези филтри</p>
        </section>
        )
        
        return (
            polls?.map!(poll => 
                <MotionDiv key={poll.id}>
                <div className={styles.poll}> 
                    
                    <section className={styles.image_container}>
                    <Image
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
                        <p>Категория : {poll.categories?.name}</p>
                        <p>Започва на {formatDate(poll.starts_at)}</p>
                        <p>Затваря на {formatDate(poll?.ends_at!)}</p>
                        {manageButtons(poll.status, poll.id)}
                    </section>
                </div> 
                </MotionDiv>
            )
        
        
        )
    }
    return pollsElement()
}

export default Polls
    
    
