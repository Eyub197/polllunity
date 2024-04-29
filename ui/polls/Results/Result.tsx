import 'chart.js/auto'
import Char from "@/ui/chars/Char"
import styles from "@/ui/polls/Results/Result.module.css"
import Option from "@/ui/options/Option"; 
import ScreenShotButton from './SreenShotBtn';
import NavigationButton from '@/ui/components/NavigationButton/NavigationButton';
import { Id } from "@/lib/types"
import { getOptionsByFk } from "@/lib/utils/options"
import { Suspense } from "react";
import { getPollById } from "@/lib/utils/polls"    


/**
 * Result component for a single poll
 * @param id {Id} - poll id
 * @returns {JSX.Element} - result page
 */
const Result = async ({ id }:Id) => {
    // fetch poll options for given poll id
    const options = await getOptionsByFk(id)
    // fetch poll information for given poll id
    const {polls} = await getPollById(id)

    // sort all poll options by votes count in descending order
    const top5options  = [
        ...options!.sort((a, b) => b.votes_count! - a.votes_count!)
    ]
    // slice first 3 options for the Char component
    const top3options = top5options?.slice(0, 3)

    return (
        <main className={styles.main}>
            <h1 className='title'>Резулатаи на анкетатa {polls?.title}</h1>
            <ScreenShotButton/>
            {/* pass poll, options and top 3 options to Char component */}
            <Char top3Data={top3options}  pollData={polls!} charData={top5options!}/>
            {/* back button */}
            <NavigationButton to={"/anketi"} back={true} text='Назад'/>
        </main>
    )
}

export default Result