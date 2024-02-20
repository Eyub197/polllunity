'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { AuthData, actions } from './types' 

const performAuthAction = async ( action : actions, formData: FormData) => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const data : AuthData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  }

  let error

  switch (action) {
    case "login":
        ({ error } = await supabase.auth.signInWithPassword(data))
        const { data: users} = await supabase
        .from("auth.users")
        .select("id")
        .eq("role","admin")
        .limit(1)

        if(users?.length === 0 ){
          await supabase 
            .from("auth.users")
            .update({"role": "admin"})
            .eq("id", users[0].id)
        }


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