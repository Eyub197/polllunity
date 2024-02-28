"use server"

import { createClient } from "@/lib/supabase/server"
import { strict } from "assert"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createOption = async (formData:FormData) : Promise<void> => {
    const supabase =  await createClient()

    const optionData = {
        poll_id : formData.get("poll_id") as string,
        option_text : formData.get("option_text") as string,
    }

    const { data:options , error } = await supabase
        .from("options")
        .insert(optionData)

    console.log(optionData)
    
    if (error) {
        throw error
    } else {
        revalidatePath("/admin/options")
    }
}

export const getOptions = async () : Promise<any[] | null> => {
    const supabase =  await createClient()
    const { data:options , error } = await supabase
        .from("options")
        .select("*, polls(title)")

    return options
}

export const updateOptionById = async (identity:string, formData: FormData) : Promise<any> => {
    const supabase = await createClient()
    
    const optionData = {
        poll_id : formData.get("poll_id") as string,
        option_text : formData.get("option_text") as string,
    }

    const {data, error} = await supabase
    .from("options")
    .update(optionData)
    .eq("id", identity)
    
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

export const deleteOption = async (id:string) : Promise<any> => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from("options")
    .delete()
    .eq("id", id)

    revalidatePath("/admin/options")
    redirect("/admin/options")
}

