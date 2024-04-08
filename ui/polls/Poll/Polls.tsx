import { createClient } from "@/lib/supabase/server"
import { getPolls } from "@/lib/utils/polls"
import Image from "next/image"
import styles from "@/ui/polls/Poll/Polls.module.css"
import ButtonLink from "@/ui/components/buttonLink/ButtonLink"
import { formatDate } from "@/lib/utils/helperFunctions"
import { MotionDiv } from "@/ui/components/framerMotino/FramerMotionDiv"
import noPolls from "@/public/no-polls.webp"
interface Filter {
filter: string,
status: string
}

const Polls = async ({filter, status} : Filter  ) => {
    const supabase = await createClient()

    const { data : { user }, error } = await supabase.auth.getUser()
    const { polls } = (await getPolls() || [])
    
    let filteredPolls
    if(!status ) {
        filteredPolls = polls?.filter(poll => poll.status === "zapocnala")
    }
    else{
        filteredPolls = polls?.filter(poll =>
            (!filter || filter === 'vsicki' || poll.category_id === filter) &&
            (!status || status === 'vsicki' || poll.status === status)
        )     
    }
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
        if(!filteredPolls?.length || filteredPolls?.length < 1) return (
        <>
        <Image 
        src={noPolls}
        width={500}
        height={300}
        alt="нема анкети с тези филтри"
        />
        <p>Няма анкети с тези филтри</p>
        
        </>
    
    )
        
        return (
            filteredPolls?.map(poll => 
                <MotionDiv   key={poll.id}>
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
                        <h3>{poll.description}</h3>
                        <p>Категория {poll.categories?.name}</p>
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
    
    
