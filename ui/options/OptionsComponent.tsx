import { createClient } from '@/lib/supabase/server';
import { getOptionsByFk, updateOptionCount } from '@/lib/utils/options'
import { getUserVote} from '@/lib/utils/userVote';
import { VoteButton } from '../ClientButtons';

export default async function OptionsComponent({ fk }: { fk: string }) {

  const supabase = await createClient()

  const { data : { user }, error } = await supabase.auth.getUser()

  const userId = user?.id as string

  const hasVoted = await getUserVote(userId, fk)

  const options = await getOptionsByFk(fk)

  const updateOptionCountAction = updateOptionCount.bind(null, fk)

  return (  
    <>
    {
      hasVoted ? 
       <p>you have already voted</p>
       : 
       <form action={updateOptionCountAction}>
        {
        options?.map((option) => ( 
  
          <div key={option.id}> 
            <input
              type="radio"
              name="option_text" 
              value={option.option_text}
              id={option.id} 
            />
            <input type="hidden" name="option_id" value={option.id} /> 
            <label htmlFor={option.id}>{option.option_text}</label> 
          </div>
          ))
          }
          <VoteButton userId={userId} pollId={fk}/>  
        </form>
    }    
    </>
  
  )
}
