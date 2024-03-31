"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { errHandlingPolls, manageImage, uploadImage } from "./helperFunctions"
import { poll_status } from "../types"


export const createPoll = async (previousState: any, formData:FormData) => {
    const image = await uploadImage(formData.get("image") as string)
    try{
        const supabase =  await createClient()
        
        const pollData = {
            title : formData.get("title") as string,
            starts_at: formData.get("starts_at") as string,
            ends_at: formData.get("ends_at") as string,        
            category_id: formData.get("category_id") as string,
            description : formData.get("description") as string,
        }
        console.log(image)
        const pollDataWithImage = { ...pollData, image}
       
        const { data, error } = await supabase
        .from("polls")
        .insert(pollDataWithImage)
      
        if (error) throw error 
        console.log(`poll ${error}`)  
        revalidatePath("/admin/polls")        
    }  catch (error : any) {
        console.log(error)
       return errHandlingPolls({
           message: error.message,
           code: error.code,
           title: formData.get("title") as string,
           starts_at: formData.get("starts_at") as string,
           ends_at: formData.get("ends_at") as string,
           image: image
       })
    }
}

export const getPolls = async () => {
    const supabase =  await createClient()
    const { data:polls , error } = await supabase
    .from("polls")
    .select("*, categories(id, name, description)")
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

export const updatePollById = async (id:string, previousState: any, formData: FormData) : Promise<any> => {
    const image = await uploadImage(formData.get("image") as string)
    try{
        const supabase =  await createClient()
        
        const pollData = {
            title : formData.get("title") as string,
            starts_at: formData.get("starts_at") as string,
            ends_at: formData.get("ends_at") as string,        
            category_id: formData.get("category_id") as string,
            description : formData.get("description") as string,
        }
        
        const {data, error} = await supabase
        .from("polls")
        .update(pollData)
        .eq("id", id)
      
        if (error) throw error 
        console.log(`poll ${error}`)  
        revalidatePath("/admin/polls")        
    }  catch (error : any) {
        console.log(error)
       return errHandlingPolls({
           message: error.message,
           code: error.code,
           title: formData.get("title") as string,
           starts_at: formData.get("starts_at") as string,
           ends_at: formData.get("ends_at") as string,
           image: image
       })
    }
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
