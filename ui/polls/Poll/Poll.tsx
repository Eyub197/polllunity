
import Link from "next/link";
import React from "react";
import styles from "@/ui/polls/PoolsPage.module.css";
import { ChoosePollButton } from "@/ui/buttons";
import { PollProps } from "@/lib/types";
import { getUserVote } from "@/lib/utils/userVote";
import { boolean } from "zod";

const Poll: React.FC<PollProps> = ({poll, user}) => {
  const now = new Date()
  const startsAt = new Date(poll.starts_at)
  const endsAt = new Date(poll.ends_at)
  const haveStarted = startsAt < now;
  const haveEnded = endsAt < now;

  return (
    <div 
      className={`${styles._poll} ${haveStarted ? styles.started : ''} ${haveEnded ? styles.closed : ''}`}
      key={poll.id}
    >
        <h2>{poll.title}</h2>
        <h3>{poll?.categories?.name}</h3>
        <p>започва: {poll.starts_at}</p>
        <p>завършва: {poll.ends_at}</p>               
        {user ? (
          <Link href={`anketi/${poll.id}/opcii`}>
            <ChoosePollButton id={poll.id}/>
          </Link>
        ) : (
          <div>
            <button>Регистрирай се</button>
            <button>Влез</button>
          </div>
        )}
    </div> 
  )
}

export default Poll
