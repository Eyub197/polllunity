"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { errHandlingPolls, updateImage, uploadImage } from "./helperFunctions"


/**
 * Creates a new poll
 * @param previousState previous state, not used
 * @param formData formData with poll data
 * @returns {Promise<any>} returns success or error message
 */
export const createPoll = async (previousState: any, formData: FormData) => {
    // Upload image if any
    const imageUploadResult = await uploadImage(formData.get("image") as string | File)

    // Check if upload was successful
    if (!imageUploadResult.success) {
        console.error(imageUploadResult.error)
        return { message: imageUploadResult.error.message }
    }

    // Try to create poll
    try {
        const supabase = await createClient()

        const pollData = {
            // Add poll data to the object
            title: formData.get("title") as string,
            starts_at: formData.get("starts_at") as string,
            ends_at: formData.get("ends_at") as string,
            category_id: formData.get("category_id") as string,
            description: formData.get("description") as string,
            image: imageUploadResult.fileName as string,
        }

        // Insert poll data into db
        const { data, error } = await supabase
            .from("polls")
            .insert(pollData)

        if (error) throw error
        // Revalidate cache
        revalidatePath("/admin/anketi")
    } catch (error: any) {
        // Return error message, if any
        return errHandlingPolls({
            message: error.message,
            code: error.code,
            title: formData.get("title") as string,
            starts_at: formData.get("starts_at") as string,
            ends_at: formData.get("ends_at") as string,
        })
    }
}

/**
 * Get all polls from the database
 * @param {string} query - Search query to filter polls by
 * @param {string} status - Status of the poll
 * @param {string} filter - Category ID to filter polls by
 * @returns {Promise<any>} Returns polls and error if any
 */
export const getPolls = async (query?: string, status?: string, filter?: string) => {

    const supabase =  await createClient()

    // Update poll statuses in the background
    await supabase.rpc("update_poll_statuses")

    let queryBuilder = supabase
        .from("polls")
        .select("*, categories(id, name, description)") // Select polls with their categories
    
    // If query is given, filter polls by title
    query && queryBuilder.ilike("title", `%${query}%`)
    // If status is given, filter polls by status
    status && queryBuilder.eq("status", status)
    // If filter is given, filter polls by category_id
    filter && queryBuilder.eq("category_id", filter)


    const { data: polls, error } = await queryBuilder
    
    // If there was an error, return it
    if (error) {
        console.error("Error fetching polls:", error);
        return { polls: null, error }
    }

    // Update poll statuses again, in case some polls were created or deleted since the previous call
    const { error: rpcError } = await supabase.rpc("update_poll_statuses");

    // If there was an error, return it
    if (rpcError) {
        console.error("Error updating poll statuses:", rpcError)
        return { polls, error: rpcError }
    }
    // If everything went well, return polls and null error
    return { polls, error: null };
        
}

/**
 * Get the status and date of a poll by its ID
 * @param {string} id - ID of the poll to get status and date for
 * @returns {Promise<any>} Returns poll's status and date, and error if any
 */
export const getPollStatusAndDate = async (id:string) => {
    const supabase =  await createClient()
    // Get the status and date of a poll by its ID
    const { data:polls , error } = await supabase
        .from("polls")
        .select("status, starts_at, ends_at") // Select status and dates of the poll
        .eq("id", id) // Filter by ID
        .single() // Return just one row

    return { polls, error }
}

/**
 * Get all currently active polls (zapocnala or nezapocnala)
 * @returns {Promise<any>} Returns the fetched polls and error if any
 */
export const getCurrentPolls = async () => {
    const supabase =  await createClient()
    // Get all polls that are currently active (zapocnala or nezapocnala)
    const { data:polls , error } = await supabase
        .from("polls")
        .select("*, categories(id, name, description)") // Select polls with their categories
        .filter('status', 'in', '("zapocnala","nezapocnala")') // Filter polls by their status
    
    // If there was an error, return it
    if (error) {
        console.error("Error fetching current polls:", error);
        return { polls: null, error }
    }
    // If everything went well, return polls and null error
    return { polls, error: null };
}


/**
 * Update poll with given ID with the given form data
 * @param {string} id - ID of the poll to update
 * @param {any} prevImage - Previous poll image name (for deleting it if necessary)
 * @param {any} previousState - Previous poll data (for reverting if there's an error)
 * @param {FormData} formData - FormData with updated poll data
 * @returns {Promise<any>} Returns result message and error if any
 */
export const updatePollById = async (id:string, prevImage:any, previousState: any, formData: FormData) : Promise<any> => {
    // Update image if necessary
    const imageUpdateResult = await updateImage(formData.get("image")! as File | string, prevImage)
    
    // If there was an error updating the image, return the error
    if (!imageUpdateResult.success) {
        console.error(imageUpdateResult.error)
        return { message: imageUpdateResult.error.message }
    }
    
    try{
        const supabase =  await createClient()
        
        // Create an object with updated poll data
        const pollData = {
            title : formData.get("title") as string,
            starts_at: formData.get("starts_at") as string,
            ends_at: formData.get("ends_at") as string,        
            category_id: formData.get("category_id") as string,
            description : formData.get("description") as string,
            image: imageUpdateResult.fileName 
        }
        
        // Update the poll with the given ID with the pollData
        const {data, error} = await supabase
        .from("polls")
        .update(pollData)
        .eq("id", id)
      
        // If there was an error, throw it
        if (error) throw error 

        // Revalidate polls page (admin/polls)
        revalidatePath("/admin/polls")
    }  catch (error : any) {

        // Handle errors and return result message and error if any
        return errHandlingPolls({
           message: error.message,
           code: error.code,
           title: formData.get("title") as string,
           starts_at: formData.get("starts_at") as string,
           ends_at: formData.get("ends_at") as string,
       })
    }
    // Redirect to polls page (admin/anketi)
    revalidatePath("/admin/anketi")
    redirect("/admin/anketi")
}

/**
 * Get poll with given ID
 * @param {string} id ID of the poll to get
 * @returns {Promise<any>} Returns poll object or error
 */
export const getPollById = async (id:string) => {
    // Create Supabase client and call RPC function to update poll status
    const supabase = await createClient()
    await supabase.rpc("update_poll_status", {poll_id: id})

    // Get the poll with the given ID from the database
    const { data:polls, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", id)
        .single()

    // Return the poll or error if any
    return {polls}
}


/**
 * Get polls by category ID
 * @param {string} id Category ID to filter polls by
 * @returns {Promise<any>} Array of poll objects or null if there was an error
 */
export const getPollByFk = async (id:string) : Promise<any> => {
    const supabase = await createClient()

    // Get polls by category ID
    const { data: polls, error } = await supabase
        .from("polls")
        .select("id") // Select just poll IDs
        .eq("category_id", id) // Filter polls by category ID

    // Return the fetched polls or null if there was an error
    return polls || null

}

/**
 * Delete poll by ID and remove its image from storage
 * @param {string} id ID of the poll to delete
 * @param {string} image Path to the poll image
 * @returns {Promise<any>} Returns nothing if everything went well or throws an error if something went wrong
 */
export const deletePoll = async (id:string, image:string) : Promise<any> => {
    const supabase = await createClient()

    // Try to remove poll image from Supabase storage
    const { error: deleteImageError } = await supabase
        .storage
        .from('images') // Remove from "images" bucket
        .remove([image]) // Remove the image with the given path

    // If there was an error, throw an exception
    if (deleteImageError) {
        throw new Error(`Failed to delete poll image: ${deleteImageError.message}`);
    }

    // Try to delete poll from Supabase database
    const { error } = await supabase
        .from('polls')
        .delete() // Delete polls table
        .eq('id', id); // Delete poll with the given ID

    // If there was an error, throw an exception
    if (error) {
        throw new Error(`Failed to delete poll: ${error.message}`);
    }

    // Revalidate "/admin/polls" page and redirect there
    revalidatePath("/admin/polls")
    redirect("/admin/polls")
}
