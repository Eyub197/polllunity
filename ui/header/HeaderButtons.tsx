import styles from "@/ui/header/Header.module.css"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/lib/auth"

/**
 * Component for header buttons.
 * Depending on whether the user is authenticated or not,
 * displays different buttons (login, register, logout).
 *
 * @returns component with buttons for unauthenticated or
 * authenticated users respectively.
 */
const HeaderButtons = async () => {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    return (
        <div className={styles.buttons_container}>
            {/* If user is authenticated, display logout button */}
            {user ? (
                <form>
                    <button className={styles.sign_out} formAction={signOut}>Излизане</button>
                </form>
            ) : (
                /* Else, display login and register buttons */
                <>
                    <Link href="/registraciq">
                        <button className={styles.register}>Регистрирай се</button>
                    </Link>
                    <Link href="/vlez">
                        <button className={styles.login}>Вход</button>
                    </Link>
                </>
            )}
        </div>
    )
}

export default HeaderButtons