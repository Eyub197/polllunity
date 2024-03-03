import ThanksForVoting from "@/ui/ThanksForVoting"

const ThanksPage = ({ params }: { params: { id: string } }) =>{
    const { id } = params
    return(<ThanksForVoting id={id}/>)
} 

export default ThanksPage


//how we can make a user vote only ones?
//1. solution make a userVote table 
// user id and hasVoted and poll_id,
/*
 after the user haas voted we should change something in his properties for the current poll
    in the user vote table we can check thee pollId and then after the click make the hasVoted to true
    if hasVoted true then show page you have already voted here wait for the results
        step 1 make the use vote table
        step 2 make the think work

*/