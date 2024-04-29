import { createClient } from '@/lib/supabase/server';
import { getOptionsByFkAndPollInfo} from '@/lib/utils/options'
import { getUserVote} from '@/lib/utils/userVote';
import VoteForm from './VoteForm';
import NavigationButton from '@/ui/components/NavigationButton/NavigationButton';

/**
 * The Options component renders the options for a specific poll,
 * based on the poll's foreign key. The component also checks if the
 * user has already voted and renders a different message and button accordingly.
 */
export default async function OptionsComponent({ fk }: { fk: string }) {

  const supabase = await createClient()

  /**
   * Gets the user's id from the Supabase auth object
   */
  const { data : { user }, error } = await supabase.auth.getUser()
  const userId = user?.id as string

  /**
   * Checks if the user has already voted for the poll by comparing the user's id
   * to the userId foreign key on the userVotes table.
   */
  const hasVoted = await getUserVote(userId, fk) 

  /**
   * Gets the options for the poll by matching the foreign key in the options table
   * to the fk parameter passed to the component.
   */
  const options = await getOptionsByFkAndPollInfo(fk)
  const poll = options?.[0]?.polls

  return (
    <>
      {/* If the user has voted, display a message and a button to go back to previous page */}
      {hasVoted ? 
      <>
        <h1 className='title'>Вече сте гласували за анкетата <span className='pc-c'>{poll?.title}</span> </h1>
        <NavigationButton to={"/anketi"} back={true} text='Назад' className='centeri'/>
      </>
      :
      <>
        {/* If the user has not voted, display a message and a form to submit their vote */}
        <h1 className='title'>Добре дошли! в анкетатa <span className='pc-c'>{poll?.title}</span> направете вашия избор</h1>
        <VoteForm options={options!} poll={poll!} userId={userId} fk={fk}/>
      </>
      }
    </>
  )  
}


