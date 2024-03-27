"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { manageImage } from "./helperFunctions"


export const createPoll = async (previousState: any,formData:FormData) => {
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
    const  {ends_at, starts_at, title} = pollDataWithImage
    try{
    
        const { data, error } = await supabase
        .from("polls")
        .insert(pollDataWithImage)
        console.log(error)
        if(error) { throw error }
        
        revalidatePath("/admin/polls")        
    }  catch (error : any) {
        
        if(error.message === 'new row for relation "polls" violates check constraint "ends_at"'){
            return { message: "Крайната дата трябва да е по-късна от датата на започване" }
        }
        if(error.code === '23514' && title.length < 1){
            return {message: "Моля, въведете заглавие"}
        }
        if(error.code === '22P02'){
            return {message: "Моля, въведете id на катеогория"}
        }
        if(error.code === '23505'){
            return {message: "Вече съществува анкета с това име"}
        }
        if(error.code === '22007'){
            if(starts_at.length < 1){
                return { message: "Моля въведете стартираща дата" }
            }
            if(ends_at.length < 1){
                return { message: "Моля въведете крайна дата" }
            }
            return {message: "Неправилен формат на датата"}
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

export const updatePollById = async (previousState: any,identity:string, formData: FormData) : Promise<any> => {
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
    console.log("formData", pollDataWithImage)
    try{
        const {data, error} = await supabase
        .from("polls")
        .update(pollData)
        .eq("id", identity)

        console.log(error)
        if(error) throw error

        revalidatePath("/admin/polls")
        redirect("/admin/polls")
        
    } catch (error : any) {
        console.error("Update Error:", error.message);
        if(error.message === 'new row for relation "polls" violates check constraint "ends_at"'){
            return { message: "Крайната дата трябва да е по-късна от датата на започване" }
        }
        if(error.code === '23514' && title.length < 1){
            return {message: "Моля, въведете заглавие"}
        }
        if(error.code === '22P02'){
            return {message: "Моля, въведете id на катеогория"}
        }
        if(error.code === '23505'){
            return {message: "Вече съществува анкета с това име"}
        }
        if(error.code === '22007'){
            if(starts_at.length < 1){
                return { message: "Моля въведете стартираща дата" }
            }
            if(ends_at.length < 1){
                return { message: "Моля въведете крайна дата" }
            }
            return {message: "Неправилен формат на датата"}
        }
    }
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
