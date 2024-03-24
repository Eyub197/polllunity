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
        
        const { name, description } = categoryData

        const { data, error } = await supabase
        .from("categories")
        .insert(categoryData)    

        if(error) throw error
        console.log(error)      
        revalidatePath("/admin/categories")

    } catch (error : any) {
        console.log(error)
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

    return { categories, error }
}

export const updateCategoryById = async (identity:string, formData: FormData) : Promise<any> => {
    const supabase = await createClient()

    const categoryData = {
        name : formData.get("category_name") as string,
        description : formData.get("description") as string
    }

    const {data, error} = await supabase
    .from("categories")
    .update(categoryData)
    .eq("id", identity)
    console.log(error?.message)
    revalidatePath("/admin/categories")
    redirect("/admin/categories")
}

export const getCategoryById = async (id:string) => {
    const supabase = await createClient()

    const { data:categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single()

    console.log(categories)
    
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

// export const updateFilters = async (formData: FormData) => {
//     const category = formData.get("category")
//     const dateStatus = formData.get("status")
//     const categoryParams = new URLSearchParams('categoriq')
//     const statusParams = new URLSearchParams('status')
//     let searchParamsUrl = "/anketi"
    
//     if(category !== "vsicki" && dateStatus !== "segashni") {
//         searchParamsUrl = `?${categoryParams}${category}&${statusParams}${dateStatus}`        
//         redirect(searchParamsUrl)
//     }

//     if(category !== "vsicki") {
//         searchParamsUrl += `?${categoryParams}${category}`
//         redirect(searchParamsUrl)    
//     }

//     if(dateStatus !== "segashni") {
//         searchParamsUrl += `?${statusParams}${dateStatus}`
//         redirect(searchParamsUrl)    
//     }


//         redirect("/anketi")
// }


export const updateFilters = async (formData: FormData) => {
    let searchParamsUrl = "/anketi"
    const category = formData.get("category") as string || "vsicki"
    const dateStatus = formData.get("status") as string
    
    const searchParams = new URLSearchParams()
        
    category !== "vsicki" && searchParams.set("categoriq", category)
    dateStatus !== "segashni" && searchParams.set("status", dateStatus)    

    if(searchParams.toString()) searchParamsUrl += `?${searchParams}`
   
    redirect(searchParamsUrl)
}



