'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AuthData } from './types' 

export const signIn = async (previousState: any, formData: FormData) => {
  const supabase = await createClient()

  const userData : AuthData = {
    email: formData.get("email") as string,
    password:formData.get("password") as string
  }

  const {email, password} = userData

  try {
    const {error} = await supabase.auth.signInWithPassword(userData)
    const { data: {user} } = await supabase.auth.getUser()
    if (error) throw error
  } catch (error : any) {
    console.error(error.message)
  
    if(email.length < 1){
      return {message: "Моля, въведете email", status: 400}       
    }
    
    if(password.length < 1) {
      console.error("no password")
      return {message: "Моля, въведете парола", status: 400} 
    }
    
    if(error.message === "Invalid login credentials" && password.length > 0 && email.length > 0){
      return {message: "Невалидни email или парола", status: 400} 
    }

    if(error.message === " Signup requires a valid password ") {
      return error.message
    } 
  }
  
  revalidatePath("/", "layout")
  redirect("/")
}


export const signUp = async (previousState: any, formData: FormData) => {
  try {
  const supabase = await createClient()
  
  const userData : AuthData = {
    email:  formData.get("email") as string,
    password: formData.get("password") as string
  }
    const {error} = await supabase.auth.signUp(userData)
    
    if (error) throw error
  } catch (error : any) {
    console.error(error.message, error.status)
    
    if(error.message === "Signup requires a valid password" && error.status === 400) {
      return {message: "Моля, въведете парола", status: 422}
    }
    if(error.message === "To signup, please provide your email" && error.status === 422){
      return {message : "Моля, въведете email адрес", status : 422}
    }
    if(error.message === "Password should be at least 6 characters." && error.status === 422){
      return {message: "Въведената парола трябва да е поне 6 символа дълга", status: 422}
    }
    if(error.message === "User already registered" && error.status === 400 ){
      return {message: "Вече има потребител с този email адрес"}
    }
    if(error.message === "Anonymous sign-ins are disabled"){
      return {message: "Моля, въведете email", status: 422}
    }
  }

  revalidatePath("/", "layout")
  redirect("/")

}


export const signOut = async () => {
  const supabase = await createClient()
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    if (typeof error === "object" && error !== null && 'message' in error) {
      console.error((error as { message: string }).message);
      return (error as { message: string }).message;
    } else {
      console.error('An unknown error occurred during sign out.');
      return 'An unknown error occurred.';
    }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export const logInWithGoogle = async () => {
  const supabase = await createClient()
  try {
    const { error } = await supabase.auth.signInWithOAuth({provider: "google"})
    if (error) throw error
  } catch (error) {
    if (typeof error === "object" && error !== null && 'message' in error) {
      console.error((error as { message: string }).message);
      return (error as { message: string }).message;
    } else {
      console.error('An unknown error occurred during login with Google.');
      return 'An unknown error occurred.';
    }
  }

  revalidatePath("/", "layout")
}
