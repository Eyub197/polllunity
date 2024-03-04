"use client"

import { Id } from "@/lib/types"
import Link from "next/link"
import { handleUserVote } from "@/lib/utils/userVote"

export const ChoosePollButton = (id:Id)  => {
    const handleClick = (id:Id) => console.log(id) 

    return(
        <button onClick={() => handleClick(id)}>Click me </button>
    )
}

export const VoteButton = ({userId, pollId} : any) => {
    return(
        <Link href={`opcii/ready`}>
            <button onClick={()=> handleUserVote(userId, pollId)}>action</button>
        </Link>
    )
}

