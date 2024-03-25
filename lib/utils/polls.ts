"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import fs from "node:fs"

export const createPoll = async (formData:FormData) : Promise<void> => {
    const supabase =  await createClient()

    let imageFile = formData.get("image")
    
    const pollData = {
        title : formData.get("title") as string,
        starts_at: formData.get("starts_at") as string,
        ends_at: formData.get("ends_at") as string,        
        category_id: formData.get("category_id") as string,
        description : formData.get("description") as string,
    }

    let filename

    if(imageFile instanceof File) {
        filename = imageFile?.name
        console.log(`file name in if ${filename}`)
        const stream = fs.createWriteStream(`public/uploads/${filename}`)
        const bufferedImage = await imageFile.arrayBuffer()
        
        stream.write(Buffer.from(bufferedImage), error => {
            if(error) throw new Error("Имаше грешка при качването на изображението")
        })
    }

    imageFile = `/uploads/${filename}` 

    const pollDataWithImage = { ...pollData, image : imageFile }

    const { data, error } = await supabase
    .from("polls")
    .insert(pollDataWithImage)

    if(error) {
        throw error
    }

    
    revalidatePath("/admin/polls")
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
