import { Id } from "@/lib/types"
import { getOptionsByFk } from "@/lib/utils/options"

const Result = async ( {id}:Id ) => {
    const options = await getOptionsByFk(id)

    return (
        <>
        {
            options!.map(option=> <p>{`${option.option_text} брой гласове ${option.votes_count} `}</p>)
        
       }

        </>
    )
}

export default Result