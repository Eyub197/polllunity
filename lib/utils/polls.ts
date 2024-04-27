"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { errHandlingPolls, updateImage, uploadImage } from "./helperFunctions"


export const createPoll = async (previousState: any, formData:FormData) => {
    const imageUploadResult = await uploadImage(formData.get("image") as string | File) 
    
    if (!imageUploadResult.success) {
        console.error(imageUploadResult.error)
        return { message: imageUploadResult.error.message }
    }
    
    try{
        const supabase =  await createClient()
        
        const pollData = {
            title : formData.get("title") as string,
            starts_at: formData.get("starts_at") as string,
            ends_at: formData.get("ends_at") as string,        
            category_id: formData.get("category_id") as string,
            description : formData.get("description") as string,
            image: imageUploadResult.fileName as string
        }     
          
        const { data, error } = await supabase
        .from("polls")
        .insert(pollData)
      
        if (error) throw error 
        revalidatePath("/admin/polls")        
    }  catch (error : any) {

    
       return errHandlingPolls({
           message: error.message,
           code: error.code,
           title: formData.get("title") as string,
           starts_at: formData.get("starts_at") as string,
           ends_at: formData.get("ends_at") as string,
       })
    }
}

export const getPolls = async (query?: string, status?:string, filter?:string) => {

    const supabase =  await createClient()
    await supabase.rpc("update_poll_statuses")

    let queryBuilder = supabase
        .from("polls")
        .select("*, categories(id, name, description)")
    
    query && queryBuilder.ilike("title", `%${query}%`)
    
    status && queryBuilder.eq("status", status)
    filter && queryBuilder.eq("category_id", filter)


    const { data: polls, error } = await queryBuilder
    
    
    if (error) {
        console.error("Error fetching polls:", error);
        return { polls: null, error }
    }

    const { error: rpcError } = await supabase.rpc("update_poll_statuses");

    if (rpcError) {
        console.error("Error updating poll statuses:", rpcError)
        return { polls, error: rpcError }
    }
    return { polls, error: null };
        
}

export const getPollStatusAndDate = async (id:string) => {
    const supabase =  await createClient()
    const { data:polls , error } = await supabase
    .from("polls")
    .select("status, starts_at, ends_at")
    .eq("id", id)
    .single()
    return { polls, error }
}

export const getCurrentPolls = async () => {
    const supabase =  await createClient()
    const { data:polls , error } = await supabase
    .from("polls")
    .select("*, categories(id, name, description)")
    .filter('status', 'in', '("open","not_started")')
    
    return { polls, error }
}

export const updatePollById = async (id:string, prevImage:any, previousState: any, formData: FormData) : Promise<any> => {
    const imageUpdateResult = await updateImage(formData.get("image")! as File | string, prevImage)
    
    if (!imageUpdateResult.success) {
        console.error(imageUpdateResult.error)
        return { message: imageUpdateResult.error.message }
    }
    
    try{
        const supabase =  await createClient()
        
        const pollData = {
            title : formData.get("title") as string,
            starts_at: formData.get("starts_at") as string,
            ends_at: formData.get("ends_at") as string,        
            category_id: formData.get("category_id") as string,
            description : formData.get("description") as string,
            image: imageUpdateResult.fileName 
        }
        
        const {data, error} = await supabase
        .from("polls")
        .update(pollData)
        .eq("id", id)
      
        if (error) throw error 
        revalidatePath("/admin/polls")        
    }  catch (error : any) {

        return errHandlingPolls({
           message: error.message,
           code: error.code,
           title: formData.get("title") as string,
           starts_at: formData.get("starts_at") as string,
           ends_at: formData.get("ends_at") as string,
       })
    }
    revalidatePath("/admin/polls")
    redirect("/admin/polls")
}

export const getPollById = async (id:string) => {
    
    const supabase = await createClient()
    await supabase.rpc("update_poll_status", {poll_id: id})
    const { data:polls, error } = await supabase
    .from("polls")
    .select("*")
    .eq("id", id)
    .single()

    
    return {polls}
}

export const getPollByFk = async (id:string) => {
    const supabase = await createClient()

    const {data: polls, error} = await supabase
    .from("polls")
    .select("id")
    .eq("category_id", id)

    return polls

}

export const deletePoll = async (id:string, image:string) : Promise<any> => {
    const supabase = await createClient()

    const { error: deleteImageError } = await supabase
        .storage
        .from('images') 
        .remove([image])

        if (deleteImageError) {
            throw new Error(`Неуспяхме да изтришме снимката: ${deleteImageError.message}`);
        }

    const { error } = await supabase
        .from('polls')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(`Неуспяхме да изтришме анкетата: ${error.message}`);
    }

    revalidatePath("/admin/polls")
    redirect("/admin/polls")
}
