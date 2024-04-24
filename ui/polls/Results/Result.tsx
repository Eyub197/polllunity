import 'chart.js/auto'
import Char from "@/ui/chars/Char"
import styles from "@/ui/polls/Results/Result.module.css"
import Option from "@/ui/options/Option"; 
import ScreenShotButton from './SreenShotBtn';
import { Id } from "@/lib/types"
import { getOptionsByFk } from "@/lib/utils/options"
import { Suspense } from "react";
import { getPollById } from "@/lib/utils/polls"    
import { placements, placementsClasses } from '@/lib/utils/helperArrays';
import Link from 'next/link';


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
            <ScreenShotButton/>
                <Suspense fallback={<p>Loading char...</p>}>
]                    <Char top3Data={top3options}  pollData={polls!} charData={top5options!}/>
                </Suspense>
            <Link href={"/anketi"}>Назад</Link>
        </main>
    )
}

export default Result