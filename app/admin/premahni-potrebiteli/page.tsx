import styles from "@/app/admin/premahni-potrebiteli/UserRemove.module.css"
import { getUsers } from "@/lib/utils/user"
import { deleteUser } from "@/lib/utils/user"
import { DeleteButtonServer } from "@/ui/Buttons"
import Search from "@/ui/components/Search/Search"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

/**
 * Page for deleting users from the database
 * Only accessible by admins
 */
const RemoveUser = async ({searchParams} : { searchParams?: {query?: string} }) => {
    // Query from the search bar
    const query = searchParams?.query

    // Get all users that match the query
    const users = await getUsers(query)

    // Get the user's role
    const currentUserRole = await getCurrentUserRole()    

    // If the current user is not an admin, redirect to the home page
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    
    // Return the page with the found users
    return(
        <>
            <h1 className="title">Премахни потребител</h1>
            {/* Search bar for finding users */}
            <Search placeholder="email"/>
            <main className={styles.main}>
            {
                users?.map(user => {
                return(
                    // Render a div for each user
                    <div className={styles.users_container} key={user.id}>
                        {/* Render some information about the user */}
                        <p><span className="bold">Email:   </span> {user.email! || "стар потребител няма email в public бд"}</p>
                        <p><span className="bold">Роля:  </span> {user.role!}</p>
                        <p><span className="bold">Id:</span> {user.id!}</p>
                        {/* Render a delete button for each user */}
                        <DeleteButtonServer action={deleteUser} id={user.id} helper={null}/>
                    </div>
                )})
            }
            </main>        
        </>

    )
}

export default RemoveUser