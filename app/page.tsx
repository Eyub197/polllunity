import Image from "next/image";
import styles from "./page.module.css";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from "@/lib/actions"
import { createCategory } from "@/lib/utils/utils";

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  return (
    <>
    <form>
    <button formAction={signOut}>signout</button>

    </form>
     <p>Hello {data.user?.email || "none"}</p>
  </>

  )
}
