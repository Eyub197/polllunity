"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"


/**
 * Fetches user vote from the database
 * @param userId - Id of the user
 * @param pollId - Id of the poll
 * @returns - boolean if user has voted or not
 */
export const getUserVote = async (userId: string, pollId: string): Promise<boolean> => {
    const supabase = await createClient()

    const { data: uservotes, error } = await supabase
        .from("uservotes")
        .select("has_voted")
        .match({ user_id: userId, poll_id: pollId })

    /* If there is any data, revalidate the page and return whether the user has voted or not */
    if (uservotes && uservotes.length > 0) {
        revalidatePath("/anketi", "page")
        return uservotes[0].has_voted
    }
    /* If there is an error, throw it as an error */
    else if (error) {
        throw new Error("failed to fetch user vote")
    }
    /* If there is no data, return false */
    else {
        return false
    }
}



/**
 * Updates the user's vote in the database
 * @param userId - Id of the user
 * @param pollId - Id of the poll
 */
export const handleUserVote = async (userId: string, pollId: string): Promise<void> => {
    const supabase = await createClient()

    // Insert user's vote into the database
    await supabase
        .from("uservotes")
        .insert({ user_id: userId, poll_id: pollId })

    // Update the vote in the database to true (has_voted)
    const { data, error } = await supabase
        .from("uservotes")
        .update({ has_voted: true })
        .match({ user_id: userId, poll_id: pollId, has_voted: false })

    // If there is an error, log it
    if (error) {
        console.error(`Error updating vote: ${error}`)
    }

    // Revalidate the entire page, as the vote has been updated
}

