"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { errHandlingPolls, manageImage } from "./helperFunctions"


export const createPoll = async (previousState: any,formData:FormData) => {
    let args = {
        message: "",
        code: "",
        ends_at: "",
        starts_at: "",
        title: "",
    }
    try{
        const supabase =  await createClient()
        
        const pollData = {
            title : formData.get("title") as string,
            starts_at: formData.get("starts_at") as string,
            ends_at: formData.get("ends_at") as string,        
            category_id: formData.get("category_id") as string,
            description : formData.get("description") as string,
        }
        const image = await manageImage(formData.get("image"))
        const pollDataWithImage = { ...pollData, image}
        const  {ends_at, starts_at, title} = pollDataWithImage
        
        args.title = title
        args.ends_at = ends_at
        args.starts_at = starts_at
        const { data, error } = await supabase
        .from("polls")
        .insert(pollDataWithImage)
      
        if (error) throw error 
        console.log(error)  
        revalidatePath("/admin/polls")        
    }  catch (error : any) {
        args.message = error.message
        args.code = error.code

      return errHandlingPolls(args)
    }
}

//TODO try wrapping everything in a try catch block and giving the title, starts_at, edns at previously in a global scoped args variable

export const getPolls = async () => {
    const supabase =  await createClient()
    const { data:polls , error } = await supabase
   .from("polls")
   .select("*, categories(id, name, description)")
    return { polls, error }
}

export const updatePollById = async (id:string, previousState: any, formData: FormData) : Promise<any> => {
    const supabase = await createClient()
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
    const  {ends_at, starts_at, title} = pollDataWithImage

    try{
        const {data, error} = await supabase
        .from("polls")
        .update(pollData)
        .eq("id", id)

        console.log(error)
        if(error) throw error
        
    } catch (error : any) {
        
        const args = {
            message: error.message,
            code: error.code,
            title,
            starts_at,
            ends_at
        }
      
        return errHandlingPolls(args)
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
