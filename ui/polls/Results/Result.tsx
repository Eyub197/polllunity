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
            <section className={styles.top_3}>
                {
                    top3options.map((option, index) => 
                        <div className={styles.placement_container}  key={index}>
                            <h2 className={styles.placement} key={index}>{placements[index]}</h2>
                            <Option
                            className='placement_color'
                            classNameContainer={placementsClasses[index]}
                            key={option.id} 
                            option_text={option.option_text}
                            votes_count={option.votes_count}
                            image={option.image}
                            />    
                        </div>
                    )
                }
            </section>
                <Suspense fallback={<p>Loading char...</p>}>
                    <h2 className="title_2 mt-3">Статистика</h2>
                    <Char  pollData={polls!} charData={top5options!}/>
                </Suspense>
            <section className={styles.all_options}>
                <h2 className={`title_2 ${styles.all_options_title}`} >Всички опции</h2>
                <div className={styles.all_options_wrapper}>
                {
                    options!.map(option => 
                        <Option
                        key={option.id} 
                        option_text={option.option_text}
                        votes_count={option.votes_count}
                        image={option.image}
                        />    
                    )  
                }
                </div>
            </section>
            <Link href={"/anketi"}>Назад</Link>
        </main>
    )
}

export default Result