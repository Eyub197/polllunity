import { createClient } from '@/lib/supabase/server';
import { getOptionsByFkAndPollInfo} from '@/lib/utils/options'
import { getUserVote} from '@/lib/utils/userVote';
import VoteForm from './VoteForm';

export default async function OptionsComponent({ fk }: { fk: string }) {

  const supabase = await createClient()

  const { data : { user }, error } = await supabase.auth.getUser()

  const userId = user?.id as string
  
  const hasVoted = await getUserVote(userId, fk) 
  const options = await getOptionsByFkAndPollInfo(fk)
  const poll = options?.[0]?.polls


  return (  
    <>
    {
    hasVoted ? 
    <h1 className='title'>Вече сте гласували за анкетата <span className='pc-c'>{poll?.title}</span> </h1>  
    :
    <>
    <h1 className='title'>Добре дошли! в анкетатa <span className='pc-c'>{poll?.title}</span> направете вашия избор</h1>
    <VoteForm options={options!} poll={poll!} userId={userId} fk={fk}/>
    </>
    }
  
    </>
  )
  
}


//take the form to its own component and add use from state and stuff so they cant vote without choosing a option