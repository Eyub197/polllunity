"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createCategory = async (previousState: any,formData:FormData) => {
    
    try {

        const supabase =  await createClient()
        const categoryData = {
            name : formData.get("category_name") as string,
            description : formData.get("description") as string
        }
        
        const { data, error } = await supabase
        .from("categories")
        .insert(categoryData)    

        if(error) throw error
        revalidatePath("/admin/categories")

    } catch (error : any) {
        if(error.code === '23505') {
            return { message: "Категорията вече съществува", status: 409 }
        }
        if(error.code === '23514')
            return { message: "Моля, въведете име на кетегорията", status: 422 } 

        return error.message
    }       

}

export const getCategories = async () => {
    const supabase =  await createClient()
   const { data:categories , error } = await supabase
   .from("categories")
   .select("*")

    return {categories, error}
}

export const updateCategoryById = async (id:string, previousState: any, formData: FormData) : Promise<any> => {
    try{
        const supabase = await createClient()
    
        const categoryData = {
            name : formData.get("category_name") as string,
            description : formData.get("description") as string
        }
    
        const { data, error } = await supabase
        .from("categories")
        .update(categoryData)
        .eq("id", id)
        
        if(error) throw error
    } catch (error:any) {
        if(error.code === '23505') {
            return { message: "Категорията вече съществува", status: 409 }
        }
        if(error.code === '23514')
            return { message: "Моля, въведете име на кетегорията", status: 422 } 

        return error.message

    } 
    finally{
        revalidatePath("/admin/categories")
        redirect("/admin/categories")   
    }
}

export const getCategoryById = async (id:string) => {
    const supabase = await createClient()

    const { data:categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single()

    
    return categories 
}

export const deleteCategory = async (id:string) : Promise<any> => {
    const supabase = await createClient()

    const { data, error } = await supabase 
    .from("categories")
    .delete()
    .eq("id", id)

    revalidatePath("/admin/categories")
    redirect("/admin/categories")
}


export const updateFilters = async (formData: FormData) => {
    let searchParamsUrl = "/anketi"
    const category = formData.get("category") as string 
    const dateStatus = formData.get("status") as string
    
    const searchParams = new URLSearchParams()
        
    category !== "vsicki" && searchParams.set("categoriq", category)

    dateStatus !== "vsicki" && searchParams.set("status", dateStatus)    

    if(searchParams.toString()) searchParamsUrl += `?${searchParams}`
   
    redirect(searchParamsUrl)
}



