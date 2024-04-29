"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient, createClient } from "../supabase/server"
import { AuthData } from "../types"

/**
 * Get all users from the database
 * @param query - Optional. If provided, filters the users by email
 * @returns Array of users or null if error
 */
export const getUsers = async (query?:string) => {
  const supabase = await createClient()

  // Create a query builder for the users table
  let queryBuilder = supabase
    .from("user")
    // Select all columns
    .select("*")

  // If query is provided, filter the users by the search query
  query && queryBuilder.ilike("email", `%${query}%`)

  // Execute the query and return the results
  const {data: users} = await queryBuilder

  return users
}



/**
 * Get the role of the currently logged in user
 * @returns {string|null} The role of the user, or null if the user is not logged in
 */
export const getCurrentUserRole = async () => {
    const supabase = await createClient()
    // Get the currently logged in user
    const { data: { user }, error } = await supabase.auth.getUser()
    // If the user is not logged in, return null
    if (error || !user) return null
    // Get the role of the user from the database
    const { data } = await supabase
        .from("user")
        .select("role")
        .eq("id", user.id) // The user's id is required for the query
        .single()

    return data?.role // Return the role of the user, or null if not found
}



// create user function for the admin
export const createUser = async (previousState: any,formData:FormData) => {
try{
    const supabase = await createAdminClient()

    const userData : AuthData = {
        email:  formData.get("email") as string,
        password: formData.get("password") as string
    }
    
    const {data, error} = await supabase.auth.admin.createUser({
        email: userData.email,
        email_confirm: true,
        password: userData.password
      })

    console.log(error)
    if(error) throw error

}   catch(error : any) {
    console.error(error.message, error.status)
    
    if(error.message === "A user with this email address has already been registered" && error.status === 422) {
      return {message: "Акаунта вече съществува", status: 422}
    }
    if(error.message === "Cannot create a user without either an email or phone" && error.status === 400){
      return {message : "Моля, въведете email адрес", status : 422}
    }
    if(error.message === "Password should be at least 6 characters." && error.status === 422){
      return {message: "Въведената парола трябва да е поне 6 символа дълга", status: 422}
    }
    if(error.message === "User already registered" && error.status === 422 ){
      return {message: "Вече има потребител с този email адрес"}
    }
    if(error.message === "Anonymous sign-ins are disabled"){
      return {message: "Моля, въведете email", status: 422}
    }

  }
}

/**
 * Deletes user from the database
 * @param {string} id - id of the user to be deleted
 */
export const deleteUser = async (id: string) => {
  const supabase = await createAdminClient()
  // delete user from the user table
  const { data, error } = await supabase
    .from("user")
    .delete()
    .eq("id", id)
  // if there is an error log it and return
  if (error) {
    console.error("error", error)
    return
  }
  // delete user from the auth table
  await supabase.auth.admin.deleteUser(id)
  // revalidate the page so the user is not shown anymore
  revalidatePath("/admin/premahni-potrebiteli")
}
