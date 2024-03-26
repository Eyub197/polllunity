"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { manageImage } from "./helperFunctions"


export const createPoll = async (formData:FormData) => {
    const supabase =  await createClient()
    
    const imageFile = formData.get("image")
    
    const pollData = {
        title : formData.get("title") as string,
        starts_at: formData.get("starts_at") as string,
        ends_at: formData.get("ends_at") as string,        
        category_id: formData.get("category_id") as string,
        description : formData.get("description") as string,
    }

    const image = await manageImage(imageFile)

    const pollDataWithImage = { ...pollData, image}
    try{
    
        const { data, error } = await supabase
        .from("polls")
        .insert(pollDataWithImage)
        console.log(error)
        if(error) { throw error }
        
        revalidatePath("/admin/polls")        
    }  catch (error : any) {

        if(error.code === '23514'){
            return {message: "Моля, въведете заглавие"}
        }
        if(error.code === '23505'){
            return {message: "Вече съществува анкета с това име"}
        }
        if(error.code === '22007'){
            return {message: "Неправилен формат на датата"}
        }
        if(error.message === 'new row for relation "polls" violates check constraint "ends_at"'){
            return { message: "Крайната дата трябва да е по-късна от стартиращата дата" }
        }
    }
}

export const getPolls = async () : Promise<any[] | null> => {
    const supabase =  await createClient()
    const { data:polls , error } = await supabase
   .from("polls")
   .select("*, categories(name, description)")
   
    return polls
}

/**
 * Update a poll by id
 * @param identity The id of the poll to update
 * @param formData The form data to update the poll with
 */
export const updatePollById = async (identity:string, formData: FormData) : Promise<any> => {
    const supabase = await createClient()

    /**
     * The data to update the poll with
     */
    const pollData = {
        title : formData.get("title") as string,
        starts_at: formData.get("starts_at") as string,
        ends_at: formData.get("ends_at") as string,
        category_id: formData.get("category_id") as string,
        description : formData.get("description") as string,
    }

    /**
     * Update the poll in the database
     */
    const {data, error} = await supabase
    .from("polls")
    .update(pollData)
    .eq("id", identity)

    /**
     * Redirect to the polls page after updating
     */
    revalidatePath("/admin/polls")
    redirect("/admin/polls")
}


export const getPollById = async (id:string) => {
    const supabase = await createClient()

    const { data:polls, error } = await supabase
    .from("polls")
    .select("*")
    .eq("id", id)
    .single()

    console.log(polls)
    
    return polls
}

export const getPollByFk = async (id:string) => {
    const supabase = await createClient()

    const {data: polls, error} = await supabase
    .from("polls")
    .select("id")
    .eq("category_id", id)

    return polls

}

export const deletePoll = async (id:string) : Promise<any> => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from("polls")
    .delete()
    .eq("id", id)

    revalidatePath("/admin/polls")
    redirect("/admin/polls")
}
