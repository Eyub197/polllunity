"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { updateImage, uploadImage } from "./helperFunctions"
import { isRedirectError } from "next/dist/client/components/redirect"
import { handleUserVote } from "./userVote"

interface Option {
    id: string;
    image: string | null;
    option_text: string;
    poll_id: string;
    votes_count: number | null;
}

interface Poll {
    id: string;
    title: string;
    options: Option[];
}

/**
 * Creates an option in the database
 * @param previousState - The previous state of the page
 * @param formData - The form data from the new option form
 * @returns object with a message if there was an error, or null if successful
 */
export const createOption = async (previousState:any,formData:FormData) => {
    try{
        const imageUploadResult = await uploadImage(formData.get("image") as string | File)
        if (!imageUploadResult.success) {
            console.error(imageUploadResult.error)
            return { message: imageUploadResult.error.message }
        }

        const supabase =  await createClient()
    
        const optionData = {
            poll_id : formData.get("poll_id") as string,
            option_text : formData.get("option_text") as string,
            image: imageUploadResult.fileName,
            votes_count: 0 
        }
    
        const { data:options , error } = await supabase
         .from("options")
         .insert(optionData)
        
        // Log any errors that occurred
        console.log(`option error ${error?.code, error?.message}`)

        // If there was an error, throw it
        if (error) throw error

        // Revalidate the page and redirect to the options page after creating the option
        revalidatePath("/admin/opcii")
    }
    catch(error : any) {
        // If the error is related to a constraint violation, return a helpful message
        if(error.message === `new row for relation "options" violates check constraint "options_option_text_check"`){
            return { message: "Моля, въведете текст!" }
        }
        // If the error is related to a unique constraint violation, return a helpful message
        if(error.message ===  `duplicate key value violates unique constraint "options_option_text_key"`){
            return { message: "Тази опция вече съществува!" }
        }
    }
}

/**
 * Fetch options from the database
 * @param filter - Filter options by poll id
 * @param query - Query for options by text
 * @returns array of options with their related poll information or null
 */
export const getOptions = async (filter?:string, query?:string) : Promise<any[] | null> => {
    const supabase =  await createClient()

    // Create a query builder for the options table
    const queryBuilder = supabase
        .from("options")
        // Select all columns and the id and title of the related poll
        .select("*, polls(id, title)")

    // If query is provided, filter the options by the search query
    query && queryBuilder.ilike("option_text", `%${query}%`)

    // If filter is provided, filter the options by poll id
    filter && queryBuilder.eq("poll_id", filter)

    // Execute the query and return the results
    const {data: options} = await queryBuilder

    return options
}

/**
 * Fetch options and their related polls from the database
 *
 * @returns An array of polls with their options or null if there was an error
 */
export const getOptionsAndPolls = async (): Promise<Poll[] | null> => {
    const supabase = await createClient();

    // Fetch options and their related polls
    const { data: optionsWithPolls, error } = await supabase
      .from('polls')
      .select('id, title, options(*)')
      // Filter polls by their status
      .filter('polls.status', 'in', ['zapocnala', 'nezapocnala'])

    // Return the fetched polls and their options or null if there was an error
    return optionsWithPolls
}

/**
 * Fetch polls information for dropdown menu
 *
 * @returns An array of objects containing poll id, title and status or null if there was an error
 */
export const getPollDropDownInfo = async () => {
    const supabase = await createClient()

    // Fetch poll id, title and status
    const {data: polls, error} = await supabase
        .from("polls")
        .select("id, title, status")
        // Filter polls by their status
        .or('status.eq.zapocnala,status.eq.nezapocnala')
    
    // Return the fetched polls or null if there was an error
    return polls
}

/**
 * Fetch all options that belong to a specific poll
 *
 * @param fk The foreign key of the poll the options belong to
 * @returns An array of options that belong to the specified poll or null if there was an error
 */
export const getOptionsByFk = async (fk: string): Promise<Option[] | null> => {
    const supabase =  await createClient()

    const { data:options , error } = await supabase
        .from("options")
        .select("*")
        .eq("poll_id", fk)

    return options
}


/**
 * Update an option by its id in the database
 *
 * @param id The id of the option to be updated
 * @param prevImage The previous image of the option, will be overwritten if a new image is uploaded
 * @param previousState The previous state of the form, will be used to check if a new image was uploaded
 * @param formData The form data that was submitted by the user
 * @returns An object containing a message if there was an error or nothing if the update was successful
 */
export const updateOptionById = async (id:string, prevImage:any, previousState: any, formData: FormData)  : Promise<any> => {
    const supabase = await createClient()

    // If a new image was uploaded update it, otherwise keep the old one
    const imageUpdateResult = await updateImage(formData.get("image")! as File | string, prevImage)

    if (!imageUpdateResult.success) {
        console.error(imageUpdateResult.error)
        return { message: imageUpdateResult.error.message }
    }

    // Create the new option data
    const optionData = {
        poll_id : formData.get("poll_id") as string,
        option_text : formData.get("option_text") as string,
        image: imageUpdateResult.fileName    
    }

    // Update the option in the database
    const {data, error} = await supabase
        .from("options")
        .update(optionData)
        .eq("id", id)

    // Revalidate the options page and navigate back to it
    revalidatePath("/admin/opcii")
    redirect("/admin/opcii")
}

/**
 * Fetch option by id from the database
 * @param id The id of the option to be fetched
 * @returns The option with the given id or undefined if there was an error
 */
export const getOptionById = async (id: string) => {
    const supabase = await createClient()

    const { data: options, error } = await supabase
        .from("options")
        .select("*")
        .eq("id", id)
        .single();

    return options;
};

/**
 * Fetch options by poll id and their related poll information from the database
 * @param fk poll id
 * @returns An array of options with their related poll information or undefined if there was an error
 */
export const getOptionsByFkAndPollInfo = async (fk: string) => {
    const supabase = await createClient()
    const { data: options, error } = await supabase
        .from("options")
        // Select all columns and the id, title and status of the related poll
        .select("*, polls(id, title, status, starts_at, ends_at)")
        // Filter by poll id
        .eq("poll_id", fk)

    // If there was an error return undefined
    if (error) {
        console.error('Error fetching options:', error)
        return
    }

    // Return the fetched options and their related poll information
    return options
}

/**
 * Increments the vote count of an option in the database
 * @param id id of the option to be updated
 * @param user_id id of the user voting
 * @param prevState previous state of the form
 * @param formData form data containing the option text
 * @returns An object with a message property if there was an error
 */
export const updateOptionCount = async (
    id: string,
    user_id: string,
    prevState: any,
    formData: FormData
) => {
    try {
        const supabase = await createClient();
        const option_text = formData.get("option_text") as string;
        const params = { option_text_param: option_text };

        // Validate option text
        if (!option_text) {
            throw new Error("Изберете опция!");
        }

        // Increment vote count
        const { error } = await supabase.rpc("increment_votes_count", params);
        if (error) throw error;

        // Update user vote
        handleUserVote(user_id, id);

        // Redirect to the poll results page
        if (option_text) {
            revalidatePath(`/anketi/${id}/opcii`);
            redirect(`/anketi/${id}/opcii/ready`);
        }
    } catch (error: any) {
        // Handle error
        if (error.message === "Изберете опция!") {
            return { message: "Изберете опция!" };
        } else if (isRedirectError(error)) throw error;
    }
};
/**
 * Deletes an option from the database
 * @param id id of the option to be deleted
 * @param image name of the image to be deleted
 * @returns an empty promise, since there is no response from the database
 */
export const deleteOption = async (id:string, image:string) : Promise<any> => {
    const supabase = await createClient()

    // Remove image from storage
    const {error: deleteImageError} = await supabase
        .storage
        .from('images')
        .remove([image])

    // Delete option from database
    const { data, error } = await supabase
        .from("options")
        .delete()
        .eq("id", id)

    // Revalidate and redirect to options page after deleting the option
    revalidatePath("/admin/options")
    redirect("/admin/options")
}


/**
 * Handles filter for admin options page.
 * Gets formData from the filter form,
 * gets poll and checks if it's not "vsicki"
 * (admin page for all polls)
 * if it's not "vsicki" it sets search param "anketa" to the poll value
 * and redirects to the options page with the search params
 * @param formData formData from the filter form
 */
export const handleOptionFilter = (formData: FormData) => {
    let searchParamsUrl = "/admin/opcii" // url for the admin options page
    const poll = formData.get("poll") as string // poll from the filter form
    
    const searchParams = new URLSearchParams() // new searchParams object
        
    /*
     * Checks if poll is not "vsicki"
     * (admin page for all polls)
     * if it's not "vsicki" it sets search param "anketa" to the poll value
     */
    poll !== "vsicki" && searchParams.set("anketa", poll)

    /*
     * If searchParams object is not empty
     * adds search params to the url
     */
    if(searchParams.toString()) searchParamsUrl += `?${searchParams}`
   
    /*
     * Redirects to the options page with the search params
     */
    redirect(searchParamsUrl)

}

