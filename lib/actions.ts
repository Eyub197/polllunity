'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { AuthData, actions } from './types' 

const performAuthAction = async ( action : actions, formData: FormData) => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const userData : AuthData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  }

  let error, user

  switch (action) {
    case "login":
      ({ error } = await supabase.auth.signInWithPassword(userData))
      break
    
    case "signup":
      ({ error } = await supabase.auth.signUp(userData))
      break 

    case "signout":
        ({error} = await supabase.auth.signOut())
      break

    default:
      throw new Error('Invalid action type')

  }

  revalidatePath("/", "layout")
  redirect("/")
}

export const login = async (formData: FormData) => {
  await performAuthAction("login", formData)
}

export const signup = async (formData: FormData) => {
  await performAuthAction("signup", formData)

}

export const signout = async () => {
  await performAuthAction("signout", new FormData)
}

export const logWthGoogle = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { error } = await supabase.auth.signInWithOAuth({provider: "google"})
  revalidatePath("/", "layout")
} 