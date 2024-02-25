"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createCategory = async (formData:FormData) : Promise<void> => {
    const supabase =  await createClient()
    const categoryData = {
        category_name : formData.get("category_name") as string,
        description : formData.get("description") as string
    }

    const { category_name, description } = categoryData

    const { data, error } = await supabase.
    from("categories")
    .insert([{name: category_name, description}])
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

export const deleteCategory = async (id:string) : Promise<any> => {
    const supabase = await createClient()

    const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)

    revalidatePath("/admin/categories")
    redirect("/admin/categories")
}


