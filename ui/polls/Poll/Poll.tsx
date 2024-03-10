import React from "react";
import styles from "@/ui/polls/PoolsPage.module.css";
import { CheckResults, ChoosePollButton } from "@/ui/buttons";
import { PollProps } from "@/lib/types";

const Poll: React.FC<PollProps> = ( {poll, user} ) => {
  const now = new Date()
  const deleteTime = new Date().getMonth() 
  const startsAt = new Date(poll.starts_at)
  const endsAt = new Date(poll.ends_at)
  const endDate = endsAt.getMonth()
  const haveStarted = startsAt < now
  const haveEnded = endsAt < now
  
  const handleButtons = () => {
    if(user && haveEnded) return <CheckResults id={poll.id}/>
    else if(user) return <ChoosePollButton id={poll.id}/>
    else return( <div> <button>Регистрирай се</button> <button>Влез</button> </div>)
  }

  return (
  <>
    {
      endDate - deleteTime < 0 ? "" 
      :
      <div 
      className={` ${styles._poll} ${haveStarted && styles.started} ${haveEnded && styles.closed} `}
      key={poll.id}
      >
        <h2>{poll.title}</h2>
        <h3>{poll?.categories?.name}</h3>
        <p>започва: {poll.starts_at}</p>
        <p>завършва: {poll.ends_at}</p>               
        {handleButtons()}     
      </div>  
    }
  </>        
  )
}

export default Poll
