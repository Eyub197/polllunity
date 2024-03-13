import React from "react";
import styles from "@/ui/polls/PoolsPage.module.css";
import { CheckResults, ChoosePollButton } from "@/ui/buttons";
import { PollProps } from "@/lib/types";

const Poll: React.FC<PollProps> = ( {poll, user, status} ) => {
  const now = new Date()
  const startsAt = new Date(poll.starts_at)
  const endsAt = new Date(poll.ends_at)
  const difference =  now.getTime() - endsAt.getTime()
  const differenceInDays = difference / (1000 * 60 * 60 * 24) 
  console.log(`${poll.title} : ${differenceInDays}`)

  const haveStarted = startsAt <= now
  const haveEnded = endsAt < now
  
  const handleButtons = () => {
    if(user && haveEnded) return <CheckResults id={poll.id}/>
    else if(user) return <ChoosePollButton id={poll.id}/>
    else return( <div> <button>Регистрирай се</button> <button>Влез</button> </div>)
  }

  const pollComponent =   
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

  const handlePollDates = () => {
    if(!status && differenceInDays < 2 ) return pollComponent

    if(status === "predishni" && differenceInDays >= 2){
     return pollComponent
    }

    if(status === "vsicki") return pollComponent

  }  
  return (
   
  //   {
  //     differenceInDays <= 2 
  //     &&
  //     <div 
  //     className={` ${styles._poll} ${haveStarted && styles.started} ${haveEnded && styles.closed} `}
  //     key={poll.id}
  //     >
  //       <h2>{poll.title}</h2>
  //       <h3>{poll?.categories?.name}</h3>
  //       <p>започва: {poll.starts_at}</p>
  //       <p>завършва: {poll.ends_at}</p>               
  //       {handleButtons()}     
  //     </div>  
  //   }
<>
    {handlePollDates()}
  </>        
  )
}

export default Poll




















// const handlePollDate = () => {
    //   if(differenceInDays >= 2 && status === "vsicki") {
    //     return (
    //     <div 
    //     className={` ${styles._poll} ${haveStarted && styles.started} ${haveEnded && styles.closed} `}
    //     key={poll.id}
    //     >
    //       <h2>{poll.title}</h2>
    //       <h3>{poll?.categories?.name}</h3>
    //       <p>започва: {poll.starts_at}</p>
    //       <p>завършва: {poll.ends_at}</p>               
    //       {handleButtons()}     
    //     </div>  
    //   )}
    //   else if (differenceInDays >= 2 && status === "predishni"){
    //   return(
    //     <>
    //       {
    //         differenceInDays >= 2 && <div 
    //         className={` ${styles._poll} ${haveStarted && styles.started} ${haveEnded && styles.closed} `}
    //         key={poll.id}
    //         >
    //           <h2>{poll.title}</h2>
    //           <h3>{poll?.categories?.name}</h3>
    //           <p>започва: {poll.starts_at}</p>
    //           <p>завършва: {poll.ends_at}</p>               
    //           {handleButtons()}     
    //         </div>
    //       }
    //     </>
          
    //     )
    //   } 
    // }
