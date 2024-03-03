import { getOptionsByFk, updateOptionCount } from '@/lib/utils/options'
import Link from 'next/link';


interface Option {
  id: string;
  option_text: string;
  poll_id: string;
  votes_count: number | null;
}

export default async function OptionsComponent({ fk }: { fk: string }) {
  const options = await getOptionsByFk(fk)

  return (  
    <form action={updateOptionCount}>
      {options?.map((option) => ( 

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
       ))}
      <Link href={`opcii/ready`}>
        <button>action</button>
      </Link>

   </form>
   )
}
