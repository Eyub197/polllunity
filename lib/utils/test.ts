"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const updateCategoryById = async (identity:string, formData: FormData) : Promise<any> => {
    const supabase = await createClient()

    const categoryData = {
        category_name : formData.get("category_name") as string,
        description : formData.get("description") as string
    }

    const { category_name, description } = categoryData

    const {data, error} = await supabase
    .from("categories")
    .update([{name: category_name, description}])
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