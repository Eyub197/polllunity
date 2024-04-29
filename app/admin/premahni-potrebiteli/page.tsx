import styles from "@/app/admin/premahni-potrebiteli/UserRemove.module.css"
import { getUsers } from "@/lib/utils/user"
import { deleteUser } from "@/lib/utils/user"
import { DeleteButtonServer } from "@/ui/Buttons"
import Search from "@/ui/components/Search/Search"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"
const RemoveUser = async ({searchParams} : { searchParams?: {query?: string} }) => {
    const query = searchParams?.query

    const users = await getUsers(query)
    const currentUserRole = await getCurrentUserRole()    
    
    if(currentUserRole !== "admin") {
        redirect('/')
    }
    
    return(
        <>
            <h1 className="title">Премахни потребител</h1>
            <Search placeholder="email"/>
            <main className={styles.main}>
            {
                users?.map(user => {
                return(
                 <div className={styles.users_container} key={user.id}>
                    <p><span className="bold">Email:   </span> {user.email! || "стар потребител няма email в public бд"}</p>
                    <p><span className="bold">Роля:  </span> {user.role!}</p>
                    <p><span className="bold">Id:</span> {user.id!}</p>
                    <DeleteButtonServer action={deleteUser} id={user.id} helper={null}/>
                 </div>
                )})
            }
            </main>        
        </>

    )
}

export default RemoveUser