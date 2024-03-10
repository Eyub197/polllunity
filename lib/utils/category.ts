"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createCategory = async (formData:FormData) : Promise<void> => {
    const supabase =  await createClient()
    const categoryData = {
        name : formData.get("category_name") as string,
        description : formData.get("description") as string
    }

    const { data, error } = await supabase
    .from("categories")
    .insert(categoryData)
    console.log(categoryData)
    
    if (error) {
        throw error
    } else {
        revalidatePath("/admin/categories")
    }
}

export const getCategories = async () : Promise<any[] | null> => {
    const supabase =  await createClient()
   const { data:categories , error } = await supabase
   .from("categories")
   .select("*")

    return categories
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

export const updateFilters = async (formData: FormData) => {
    const category = formData.get("category")

    if(category !== "всички"){
        const params = new URLSearchParams(`categoriq`)
        redirect(`/anketi/?${params}${category}`)
    }

    redirect("/anketi")

}


