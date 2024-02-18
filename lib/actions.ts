'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'


interface AuthData {
  email : string,
  password: string
}

const performAuthAction = async (
  action : "login" | "signup" | "signout",
  formData: FormData
) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const data : AuthData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  }

  let error

  switch (action) {
    case "login":
        ({error} = await supabase.auth.signInWithPassword(data))
      break
    
    case "signup":
        ({error} = await supabase.auth.signUp(data))
      break
    
    case "signout":
        ({error} = await supabase.auth.signOut())
      break

    default:
      throw new Error('Invalid action type')

  }

  if(error) {
    redirect("/login")
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