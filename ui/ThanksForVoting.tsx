import { Id } from "@/lib/types"
import { getPollById } from "@/lib/utils/polls"
import Link from "next/link"
import styles from "@/ui/ThanksForVoting.module.css"


const ThanksForVoting = async ( {id}: Id  ) => {
    const poll = await getPollById(id)

    return(
        <main className={styles.main}>
            <h1>Благодарим ви за участието в анкетата {poll?.title}</h1>
            <Link href={"/anketi"}>
                <button>Други анкети</button>
            </Link>
        </main>
    )

}

export default ThanksForVoting