"use server"

import { createClient } from "../supabase/server"

export const  handleUserVote = async( userId:string, pollId:string ) => {
    const supabase = await createClient()

     await supabase
        .from("uservotes")
        .insert({user_id:userId, poll_id: pollId})

    const {data, error} = await supabase
        .from("uservotes")
        .update({has_voted: true})
        .match({ user_id: userId, poll_id: pollId, has_voted: false })

    if(error){
        console.error(`Error updating vote: ${error}`)
    }
}


export const getUserVote = async( userId:string, pollId:string ) => {
    const supabase = await createClient()

     const {data : uservotes, error} = await supabase
        .from("uservotes")
        .select("has_voted")
        .match({ user_id: userId, poll_id: pollId})


    if(uservotes && uservotes.length > 0)
        return uservotes[0].has_voted
    else if(error)
        throw new Error("failed to fetch user vote")
    else 
        return false

}