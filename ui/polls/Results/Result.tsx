import 'chart.js/auto'
import Char from "@/ui/chars/Char"
import styles from "@/ui/polls/Results/Result.module.css"
import Option from "@/ui/options/Option"; 
import { Id } from "@/lib/types"
import { getOptionsByFk } from "@/lib/utils/options"
import { Suspense } from "react";
import { getPollById } from "@/lib/utils/polls"    
import { placements, placementsClasses } from '@/lib/utils/helperArrays';

const Result = async ({ id }:Id) => {

    const options = await getOptionsByFk(id)
    const {polls} = await getPollById(id)

    const top5options  = [
        ...options!?.sort((a, b) => b.votes_count! - a.votes_count!)
    ]

    const top3options = top5options?.slice(0, 3)

    return (
        <main className={styles.main}>
            <h1 className='title'>Резулатаи на анкетатa {polls?.title}</h1>
            <section className={styles.top_3}>
                {
                    top3options.map((option, index) => 
                        <>
                        <h2 className={styles.placement} key={index}>{placements[index]}</h2>
                        <Option
                         classNameContainer={placementsClasses[index]}
                         key={option.id} 
                         option_text={option.option_text}
                         votes_count={option.votes_count}
                         image={option.image}
                         />
                        
                        </>
                    )
                }
            </section>
            <section className={styles.char}>
                <Suspense fallback={<p>Loading char...</p>}>
                    <Char pollData={polls!} charData={top5options!}/>
                </Suspense>
            </section>
            <section>
                {
                    options!.map(option=> <p key={option.id}>{`${option.option_text} брой гласове ${option.votes_count} `}</p>)  
                }
            </section>
        </main>
    )
}

export default Result