import { createClient } from '@/lib/supabase/server';
import { getOptionsByFkAndPollInfo, updateOptionCount } from '@/lib/utils/options'
import { getUserVote} from '@/lib/utils/userVote';
import { VoteButton } from '../../ClientButtons';
import Image from 'next/image';
import RadioButton from '../../components/RadioButton/RadioButton';
import styles from "@/ui/options/optionComponents/OptionComponents.module.css"


export default async function OptionsComponent({ fk }: { fk: string }) {

  const supabase = await createClient()

  const { data : { user }, error } = await supabase.auth.getUser()

  const userId = user?.id as string
  
  const hasVoted = await getUserVote(userId, fk) 
  const options = await getOptionsByFkAndPollInfo(fk)
  const poll = options?.[0]?.polls

  const updateOptionCountAction = updateOptionCount.bind(null, fk)

  return (  
    <>
    {!hasVoted &&
    <h1 className='title'>Добре дошли! в анкетатa <span className='pc'>{poll?.title}</span> направете вашия избор</h1>}
    {
      hasVoted ? 
       <p>you have already voted</p>
       : 
       <form className={styles.form} action={updateOptionCountAction}>
        <div className={styles.options} >
        {
        options?.map((option) => ( 
          <div key={option.id}> 
            <Image
              src={`https://knefgqtvaywusxthuztg.supabase.co/storage/v1/object/public/images/${option.image}`}
              width={400}
              height={300}
              alt="снимка за опцияата"
              style={{ objectFit: "cover",  objectPosition: "center", borderRadius: "5.5pt 5.5pt 0pt 0pt",
              display: "block", 
              marginBottom: "0px",
              width: "100%"
            }}
            />
            <div className={styles.bottom_part}>
              <p className={styles.option_text}>{option.option_text}</p>
              <RadioButton about={option.option_text} />
              <input type="hidden" name="option_id" value={option.id} /> 
            </div>
          </div>
          ))
          }
        </div>
          {
            poll?.status === "nezapocnala" ? 
            <p>Анкетата не е започнала все още, заради това няма да може да гласувате</p>
            : 
           <VoteButton userId={userId} pollId={fk}/> 
          }
        </form>
    }    
    </>
  )
  
}
