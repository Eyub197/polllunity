import { PollBadgeParams } from "@/lib/types"

const PollBadge = ({starts, ends, userVote, label }:PollBadgeParams ) => {
    const now = new Date()

    const isStarted : boolean = starts  < now
    const isFinished = ends < now
    const isUserVoted = userVote

    const handleBadge = () => {
        if(isStarted) return <h3>Анкетата започна можете да гласувате</h3>
        if(isFinished) return <h3>Анкетата завърши</h3>
        if(isUserVoted) return <h3>Вече гласувахте</h3>

        return <h3>Анкетата не е отворена за гласуване</h3>
    }
    
    return handleBadge()
    
}

export default PollBadge