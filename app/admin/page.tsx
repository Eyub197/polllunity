import Image from "next/image";
import styles from "./page.module.css";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from "@/lib/auth"

export default async function Home() {
  

  return (
    <h1>
    Landing page 
     
  </h1>

  )
}
