"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createPoll = async (formData:FormData) : Promise<void> => {
    const supabase =  await createClient()

    const pollData = {
        title : formData.get("title") as string,
        starts_at: formData.get("starts_at") as string,
        ends_at: formData.get("starts_at") as string,
        category_id: formData.get("category_id") as string,
        description : formData.get("description") as string,
    }

    const { data, error } = await supabase
    .from("polls")
    .insert(pollData)

    console.log(pollData)
    
    if (error) {
        throw error
    } else {
        revalidatePath("/admin/polls")
    }
}

export const getPolls = async () : Promise<any[] | null> => {
    const supabase =  await createClient()
    const { data:polls , error } = await supabase
   .from("polls")
   .select("*, categories(name, description)")

    return polls
}

export const updatePollById = async (identity:string, formData: FormData) : Promise<any> => {
    const supabase = await createClient()

    const pollData = {
        title : formData.get("title") as string,
        starts_at: formData.get("starts_at") as string,
        ends_at: formData.get("starts_at") as string,
        category_id: formData.get("category_id") as string,
        description : formData.get("description") as string,
    }

    const {data, error} = await supabase
    .from("polls")
    .update(pollData)
    .eq("id", identity)
    
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

export const deletePoll = async (id:string) : Promise<any> => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from("polls")
    .delete()
    .eq("id", id)

    revalidatePath("/admin/polls")
    redirect("/admin/polls")
}

