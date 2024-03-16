"use client"
import Link from "next/link"
import { handleUserVote } from "@/lib/utils/userVote"
import styles from "@/ui/Testing.module.css"

export const VoteButton = ({userId, pollId} : any) => {
    return(
        <button onClick={()=> handleUserVote(userId, pollId)}>
            action
        </button>
    )
}