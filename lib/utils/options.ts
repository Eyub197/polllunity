"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "./helperFunctions"


export const createOption = async (formData:FormData) : Promise<void> => {
    try{
        const image = await uploadImage(formData.get("image") as string)
        const supabase =  await createClient()
    
        const optionData = {
            poll_id : formData.get("poll_id") as string,
            option_text : formData.get("option_text") as string,
            image,
            votes_count: 0 
        }
        console.log(optionData)
    
        const { data:options , error } = await supabase
         .from("options")
         .insert(optionData)
            
        if (error) throw error

    } catch(error : any) {
        if (error.message) {
            console.log(`Error: ${error.message}`);
        } else {
            // If the error object doesn't have a message property, stringify it.
            console.log(`Error: ${JSON.stringify(error, null, 2)}`);
        }
    }
}

export const getOptions = async () : Promise<any[] | null> => {
    const supabase =  await createClient()
    const { data:options , error } = await supabase
        .from("options")
        .select("*, polls(title)")

    return options
}

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

export const deleteOption = async (id:string) : Promise<any> => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from("options")
    .delete()
    .eq("id", id)

    revalidatePath("/admin/options")
    redirect("/admin/options")
}

