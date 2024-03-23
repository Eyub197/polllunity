"use server"

import { createClient } from "../supabase/server"

export const getCurrentUserRole = async () => {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    const {data} = await supabase
        .from("user")
        .select("role")
        .eq("id", user?.id!)
        .single()

    console.log(data?.role)
    return data?.role
}

