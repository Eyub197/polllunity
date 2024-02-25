'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AuthData, actions } from './types' 

const performAuthAction = async ( action : actions, formData: FormData) => {

  const supabase = createClient()

  const userData : AuthData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  }

  let error, user

  switch (action) {
    case "signIn":
      ({ error } = await supabase.auth.signInWithPassword(userData))
      break
    
    case "signUp":
       ({ error } = await supabase.auth.signUp(userData))
      break 

    case "signOut":
        ({error} = await supabase.auth.signOut())
      break

    default:
      throw new Error('Invalid action type')

  }

  revalidatePath("/", "layout")
  redirect("/")
}

export const signIn = async (formData: FormData) => {
   await performAuthAction("signIn", formData)
} 
export const signUp = async (formData: FormData) => {
   await performAuthAction("signUp", formData)
}

export const signOut = async () => await performAuthAction("signOut", new FormData)

export const logWthGoogle = async () => {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({provider: "google"})
  revalidatePath("/", "layout")
} 