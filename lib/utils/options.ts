"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "./helperFunctions"


export const createOption = async (previousState:any,formData:FormData) : Promise<void> => {
    try{
        const image = await uploadImage(formData.get("image") as string)
        const supabase =  await createClient()
    
        const optionData = {
            poll_id : formData.get("poll_id") as string,
            option_text : formData.get("option_text") as string,
            image,
            votes_count: 0 
        }
    
        const { data:options , error } = await supabase
         .from("options")
         .insert(optionData)
            
        if (error) throw error
        revalidatePath("/admin/options")
    } catch(error : any) {
        if (error.message) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log(`Error: ${JSON.stringify(error, null, 2)}`);
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

export const getOptionsAndPolls = async () => {
    const supabase = await createClient()
    const { data:options , error } = await supabase
        .from("options")
        .select(`*, polls (id, title)`)
        .filter('polls.status', 'in', '(open,not_started)')

        return options
} 
//TODO the ideas is that this function will get the options and the poll id so i can make the sorting with one request

export const updateOptionById = async (id:string, formData: FormData) : Promise<any> => {
    const supabase = await createClient()
    
    const optionData = {
        poll_id : formData.get("poll_id") as string,
        option_text : formData.get("option_text") as string,
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

    export const getOptionsByFk = async (fk:string)  => {
        const supabase = await createClient()
        const { data: options, error } = await supabase
        .from("options")
        .select("*")
        .eq("poll_id", fk)

        return options
    }

export const updateOptionCount = async (id :string, formData : FormData) => {
    const supabase = await createClient()

    const option_text = formData.get("option_text") as string

    const params = { option_text_param: option_text }

    const { error } = await supabase.rpc("increment_votes_count", params)

    if(error){
        console.log(error)
        return error
    } 
    else{
        console.log("it worked")
        revalidatePath(`/anketi/${id}/opcii`)
        redirect(`/anketi/${id}/opcii/ready`)
    }
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

