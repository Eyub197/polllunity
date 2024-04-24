import styles from "@/ui/header/Header.module.css"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/lib/auth"

const HeaderButtons = async () => {
    const supabase = await createClient()
    const {data : {user}, error} = await supabase.auth.getUser()

    return(

        <div className={styles.buttons_container}>
            {
                user ? <form><button formAction={signOut}>Излизане </button> </form>   
                : 
                <>
                    <Link href="/registraciq">
                        <button className={styles.register}> Регистрирай се </button>
                    </Link>
                    <Link href="/vlez">
                        <button className={styles.login}> Вход </button>      
                    </Link>
                </>
            }
            
        </div>
    )
}

export default HeaderButtons