import { Id } from "@/lib/types"
import { getPollById } from "@/lib/utils/polls"
import Link from "next/link"
import styles from "@/ui/thanksForVoting/ThanksForVoting.module.css"
import { FaCheck } from "react-icons/fa";

const ThanksForVoting = async ( {id}: Id  ) => {
    const poll = await getPollById(id)

    return(
        <main className={styles.main}>
            <FaCheck className={styles.icon_check}/>            
            <h1 className={styles.thanks_message}>Благодарим ви за участието в анкетата <span className="pc"> {poll?.polls?.title}</span></h1>
            <p className={styles.helper_message}>Вашия глас беше обработен <span className={styles.success}>успешно</span></p>
            <Link href={"/anketi"}>
                <button className={styles.button}>Други анкети</button>
            </Link>
        </main>
    )

}

export default ThanksForVoting