import Image from "next/image";
import styles from "./page.module.css";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signout } from "@/lib/actions"

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()


  return (
    <>
    <form>
    <button formAction={signout}>signout</button>

    </form>
     <p>Hello {data.user?.email || "none"}</p>
  </>

  )
}
