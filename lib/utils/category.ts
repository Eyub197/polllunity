"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

/**
 * Create a new category
 * @param previousState - Previous state of the component
 * @param formData - Form data from the form
 * @returns - Object with a message and status code or error message
 */

export const createCategory = async (previousState: any,formData: FormData) => {
    try {
        const supabase = await createClient();

        const categoryData = {
            name: formData.get("category_name") as string,
            description: formData.get("description") as string
        };

        const { data, error } = await supabase
            .from("categories")
            .insert(categoryData);

        if (error) {
            throw error;
        }

        revalidatePath("/admin/categories");
    } catch (error: any) {
        if (error.code === "23505") {
            return {
                message: "Категорията вече съществува",
                status: 409
            };
        }
        if (error.code === "23514") {
            return {
                message: "Моля, въведете име на кетегорията",
                status: 422
            };
        }

        return error.message;
    }
    revalidatePath("/admin/kategorii");
};

/**
 * Gets all categories from the database
 * @returns An object containing the categories and the error (if any)
 */
export const getCategories = async () => {
    const supabase = await createClient();
    // Select all columns from the categories table
    const { data: categories, error } = await supabase
        .from("categories")
        .select("*");

    return { categories, error };
}

/**
 * Updates a category by its id in the database
 * @param id The id of the category to update
 * @param previousState The previous state of the component
 * @param formData The form data of the category form
 * @returns An object containing the error message and status code (if any)
 */
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
            return {
                /**
                 * The error message that will be displayed to the user
                 */
                message: "Категорията вече съществува",
                /**
                 * The status code that will be returned to the client
                 */
                status: 409
            }
        }
        if(error.code === '23514') {
            return {
                message: "Моля, въведете име на кетегорията",
                status: 422
            }
        }

        return error.message

    } 
    finally{
        /**
         * Revalidate the categories page so that the changes are displayed
         */
        revalidatePath("/admin/kategorii")
        /**
         * Redirect the user to the categories page
         */
        redirect("/admin/kategorii")   
    }
}

/**
 * Returns a category by its id from the database
 * @param id The id of the category to retrieve
 * @returns The category with the given id, if it exists
 */
export const getCategoryById = async (id:string) : Promise<any> => {
    const supabase = await createClient()

    const { data:category, error } = await supabase
    // Get the category with the given id from the database
    .from("categories")
    // Select all columns for the category
    .select("*")
    // Find the category with the given id
    .eq("id", id)
    // Return a single result (not an array)
    .single()

    // Return the category (if it exists)
    return category
}


/**
 * Deletes a category by its id from the database
 * @param id The id of the category to delete
 * @returns An object containing the error message and status code (if any)
 */
export const deleteCategory = async (id:string) : Promise<any> => {
    const supabase = await createClient()

    // Delete the category with the given id from the database
    const { data, error } = await supabase
        .from("categories")
        .delete()
        // Find the category with the given id
        .eq("id", id)

    // Revalidate the categories page so that the deleted category is not displayed
    revalidatePath("/admin/categories")
    // Redirect the user to the categories page
    redirect("/admin/categories")

    // Return any errors that may have occurred
    return error
}



/**
 * Updates the filters on the polls page based on the form data
 * @param formData The form data of the filters form
 */
export const updateFilters = async (formData: FormData) : Promise<void> => {
    let searchParamsUrl = "/anketi"
    const category = formData.get("category") as string 
    const dateStatus = formData.get("status") as string
    
    const searchParams = new URLSearchParams()
        
    // If the category is not "vsicki" (all categories), set the "categoriq" search parameter
    category !== "vsicki" && searchParams.set("categoriq", category)

    // If the date status is not "vsicki" (all dates), set the "status" search parameter
    dateStatus !== "vsicki" && searchParams.set("status", dateStatus)    

    // If there are any search parameters, add them to the url
    if(searchParams.toString()) searchParamsUrl += `?${searchParams}`
   
    // Redirect the user to the updated url
    redirect(searchParamsUrl)
}




