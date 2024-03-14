import { Id } from "@/lib/types"
import { getOptionsByFk } from "@/lib/utils/options"
import { Suspense } from "react";
import TestChart from "@/ui/chars/TestChar"
import 'chart.js/auto';
import styles from "@/ui/chars/Test.module.css"


const Result = async ( {id}:Id ) => {
    const options = await getOptionsByFk(id)

    return (
        <>
        {
            options!.map(option=> <p>{`${option.option_text} брой гласове ${option.votes_count} `}</p>)
            
       }
       <div className={styles.test}>
        <Suspense fallback={<p>Loading...</p>}>
            <TestChart charData={options!}/>
        </Suspense>
       </div>

        </>
    )
}

export default Result