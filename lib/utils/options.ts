"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "./helperFunctions"

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
        
        console.log(`option error ${error?.code, error?.message}`)
        if (error) throw error
        revalidatePath("/admin/options")
    } catch(error : any) {
        if(error.message === `new row for relation "options" violates check constraint "options_option_text_check"`){
            return { message: "Моля, въведете текст!" }
        }
        if(error.message ===  `duplicate key value violates unique constraint "options_option_text_key"`){
            return { message: "Тази опция вече съществува!" }
        }
    }
}

export const getOptions = async () : Promise<any[] | null> => {
    const supabase =  await createClient()
    const { data:options , error } = await supabase
        .from("options")
        .select("*")

    return options
}

export const getOptionsAndPolls = async (): Promise<Poll[] | null> => {
    const supabase = await createClient();
    const { data: optionsWithPolls, error } = await supabase
      .from('polls')
      .select('id, title, options(*)')
      .filter('polls.status', 'in', ['open', 'not_started'])
      
    return optionsWithPolls
}

export const getPollDropDownInfo = async () => {
    const supabase = await createClient()
    const {data: polls, error} = await supabase
    .from("polls")
    .select("id, title")

    return polls
}

export const getOptionsByFk = async (fk: string) => {
    const supabase =  await createClient()
    const { data:options , error } = await supabase
        .from("options")
        .select("*")
        .eq("poll_id", fk)

    return options
}

export const updateOptionById = async (id:string, prevImage:any, previousState: any, formData: FormData)  : Promise<any> => {
    const supabase = await createClient()
    const imageUploadResult = await uploadImage(formData.get("image") as string | File)
    
    if (!imageUploadResult.success) {
            console.error(imageUploadResult.error)
            return { message: imageUploadResult.error.message }
        }


    const optionData = {
        poll_id : formData.get("poll_id") as string,
        option_text : formData.get("option_text") as string,
        image: imageUploadResult.fileName    
    }

    const {data, error} = await supabase
    .from("options")
    .update(optionData)
    .eq("id", id)
    
    revalidatePath("/admin/options")
    redirect("/admin/options")
}

export const getOptionById = async (id:string) => {
    const supabase = await createClient()

    const { data:options, error } = await supabase
    .from("options")
    .select("*")
    .eq("id", id)
    .single()

    console.log(options)
    
    return options
}

export const getOptionsByFkAndPollInfo = async (fk: string) => {
    const supabase = await createClient()
    const { data: options, error } = await supabase
        .from("options")
        .select("*, polls(status, starts_at, ends_at, id, title)")
        .eq("poll_id", fk)

    if (error) {
        console.error('Error fetching options:', error)
        return 
    }
    
    return options
}
export const updateOptionCount = async (id :string, formData : FormData) => {
    try{
        const supabase = await createClient()
    
        const option_text = formData.get("option_text") as string
    
        const params = { option_text_param: option_text }
    
        const { error } = await supabase.rpc("increment_votes_count", params)

        if(option_text.length < 0) throw error
        console.log("run")
    } catch(error){
        console.log(error)
    }
    revalidatePath(`/anketi/${id}/opcii`)
    redirect(`/anketi/${id}/opcii/ready`)
}

export const deleteOption = async (id:string, image:string) : Promise<any> => {
    const supabase = await createClient()

    const {error: deleteImageError} = await supabase
    .storage
    .from('images')
    .remove([image])

    const { data, error } = await supabase
    .from("options")
    .delete()
    .eq("id", id)

    revalidatePath("/admin/options")
    redirect("/admin/options")
}

