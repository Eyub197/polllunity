import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

const AdminPage = async () => {

    const supabase = await createClient()

    const { data:user, error } = await supabase.from("user").select("role").single()

    if (user?.role !== "admin") {
        console.log(user)
        redirect("/")
    }

    return(
        <h1>Admins only</h1>
    )
}

export default AdminPage