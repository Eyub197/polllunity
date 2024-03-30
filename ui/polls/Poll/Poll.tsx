"use client"

import React from "react";
import styles from "@/ui/polls/PoolsPage.module.css";
import { CheckResults, ChoosePollButton } from "@/ui/Buttons";
import { PollProps } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion"

const Poll: React.FC<PollProps> = ( {poll, user, status} ) => {
  const now = new Date()
  const startsAt = new Date(poll.starts_at)
  const endsAt = new Date(poll.ends_at!)
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
  <AnimatePresence>
    <motion.div 
    className={` ${styles._poll} ${haveStarted && styles.started} ${haveEnded && styles.closed} `}
    key={poll.id}
    initial={{opacity: 0}}
    animate= {{opacity: 1}}
    exit={{opacity: 0}}
    layout
    >
         <h2>{poll.title}</h2>
         <h3>{poll?.categories?.name}</h3>
         <p>започва: {poll.starts_at}</p>
         <p>завършва: {poll.ends_at}</p>               
         {handleButtons()}     
    </motion.div>   
  </AnimatePresence>

  const handlePollDates = () => {
    const isCurrent = !status && differenceInDays < 2 
    const isOld = status === "predishni" && differenceInDays >= 2 
    const showAll = status === "vsicki"    
    if(isCurrent || isOld || showAll) return pollComponent
  }  

  return (
  <>
    {handlePollDates()}
  </>        
  )
}

export default Poll
