import { Option as OptionProps } from "@/lib/types"
import Image from "next/image"
const Option = ({ image, option_text, votes_count}: OptionProps) => {
    return(
        <div>
            {image && (
                <Image
                src={`https://knefgqtvaywusxthuztg.supabase.co/storage/v1/object/public/images/${image}`}
                alt="консепцуална снимка за избор на опцията"
                width={250}
                height={150}
            />)}
            <p>{votes_count}</p>
            <p>{option_text}</p>            
        </div>
    )
}

export default Option