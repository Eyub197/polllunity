import { Id } from "@/lib/types"
import { getOptionsByFk } from "@/lib/utils/options"
import { Suspense } from "react";
import Char from "@/ui/chars/Char"
import 'chart.js/auto';
import styles from "@/ui/chars/Test.module.css"
import { getPollById } from "@/lib/utils/polls";


const Result = async ( {id}:Id ) => {
    const options = await getOptionsByFk(id)
    const poll = await getPollById(id)

    return (
        <>
            {
                options!.map(option=> <p>{`${option.option_text} брой гласове ${option.votes_count} `}</p>)  
            }
        <div className={styles.test}>
            <Suspense fallback={<p>Loading...</p>}>
                <Char pollData={poll!} charData={options!}/>
            </Suspense>
        </div>
        </>
    )
}

export default Result