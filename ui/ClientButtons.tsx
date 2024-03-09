"use client"

import { Id } from "@/lib/types"
import Link from "next/link"
import { handleUserVote } from "@/lib/utils/userVote"

export const VoteButton = ({userId, pollId} : any) => {
    return(
        <Link href={`opcii/ready`}>
            <button onClick={()=> handleUserVote(userId, pollId)}>action</button>
        </Link>
    )
}

