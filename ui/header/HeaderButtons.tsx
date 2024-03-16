import styles from "@/ui/header/header.module.css"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/lib/auth"

const HeaderButtons = async () => {
    const supabase = await createClient()
    const {data : {user}, error} = await supabase.auth.getUser()

    return(

        <div className={styles.buttons_container}>
            {
                user ? <form> <p>{user.email}</p> <button formAction={signOut}>Излизане </button> </form>   
                : 
                <>
                    <Link href="/register">
                        <button className={styles.register}> Регистрирай се </button>
                    </Link>
                    <Link href="/sign-in">
                        <button className={styles.login}> Вход </button>      
                    </Link>
                </>
            }
            
        </div>
    )
}

export default HeaderButtons