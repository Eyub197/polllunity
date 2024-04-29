"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient, createClient } from "../supabase/server"
import { AuthData } from "../types"

export const getUsers = async (query?:string) => {
  const supabase = await createClient()

  let queryBuilder =  supabase
  .from("user")
  .select("*")

  query && queryBuilder.ilike("email", `%${query}%`)
  const {data: users} = await queryBuilder

  return users
}


export const getCurrentUserRole = async () => {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    const {data} = await supabase
        .from("user")
        .select("role")
        .eq("id", user?.id!)
        .single()

    return data?.role
}

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

export const deleteUser = async (id:string) => {
  const supabase = await createAdminClient() 
  const {} = await supabase
  .from("user")
  .delete()
  .eq("id", id) 
  const { data, error } = await supabase.auth.admin.deleteUser(id)
  console.log("error", error)
  revalidatePath("/admin/premahni-potrebiteli")

}