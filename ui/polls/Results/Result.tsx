import { Id } from "@/lib/types"
import { getOptionsByFk } from "@/lib/utils/options"
import { Suspense } from "react";
import Char from "@/ui/chars/Char"
import 'chart.js/auto'
import styles from "@/ui/chars/Test.module.css"
import { getPollById } from "@/lib/utils/polls"     
import { Option } from "@/lib/types"

const Result = async ({ id }:Id) => {

    const options = await getOptionsByFk(id)
    const poll = await getPollById(id)

    const top5options : Option[] = [
        ...options!?.slice(0, 5)
        .sort( (a:Option, b: Option) => b.votes_count! - a.votes_count!) 
    ]

    return (
        <main>
            <section className={styles.test}>
                <Suspense fallback={<p>Loading...</p>}>
                    <Char pollData={poll!} charData={top5options!}/>
                </Suspense>
            </section>
            <section>
                {
                    options!.map(option=> <p>{`${option.option_text} брой гласове ${option.votes_count} `}</p>)  
                }
            </section>
        </main>
    )
}

export default Result