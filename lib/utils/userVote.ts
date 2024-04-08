"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"
import { redirect } from "next/navigation"


export const getUserVote = async( userId:string, pollId:string ) => {
    const supabase = await createClient()

    const {data : uservotes, error} = await supabase
    .from("uservotes")
        .select("has_voted")
        .match({ user_id: userId, poll_id: pollId})
        

    if(uservotes && uservotes.length > 0) {
        revalidatePath("/anketi", "page")
        return uservotes[0].has_voted
    }
    else if(error)
        throw new Error("failed to fetch user vote")
    else 
        return false
    
}



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
        
        revalidatePath("/anketi", "page")
    
    
    


        
        // export const  handleUserVote = async(formData:FormData) => {
        //     const supabase = await createClient()
        
        //     const userId = formData.get("user_id") as string
        //     const pollId = formData.get("poll_id") as string
        
        //      await supabase
        //         .from("uservotes")
        //         .insert({user_id:userId, poll_id: pollId})
        
        //     const {data, error} = await supabase
        //         .from("uservotes")
        //         .update({has_voted: true})
        //         .match({ user_id: userId, poll_id: pollId, has_voted: false })
        
        //     if(error){
        //         console.error(`Error updating vote: ${error}`)
        //     }
        
        //     revalidatePath("/anketi", "page")
        // }
        
        
    }