"use client"

import Image  from "next/image"
import styles from "./OptionComponents.module.css"
import { Option } from "@/lib/types";
import { VoteButton } from "@/ui/ClientButtons";
import RadioButton from "@/ui/components/RadioButton/RadioButton";
import { updateOptionCount } from "@/lib/utils/options";
import { useFormState } from "react-dom";

interface VoteFormProps {
  options: Option[];
  poll: { 
    status: string; 
    starts_at: string;
    ends_at: string | null; 
    id: string; 
    title: string; }
  
  userId: string;
  fk: string;
}

const VoteForm = ({options, poll, userId, fk }: VoteFormProps) => {
    const updateOptionCountAction = updateOptionCount.bind(null, fk)
    const [error, dispatch] = useFormState(updateOptionCountAction, undefined)
    return (
        <form 
        className={styles.form} 
        action={dispatch}
        >
        <div className={styles.options}>
          {options?.map((option) => (
            <div
            className={styles.option}
            key={option.id}>
              <Image
                src={`https://knefgqtvaywusxthuztg.supabase.co/storage/v1/object/public/images/${option.image}`}
                width={400}
                height={300}
                alt="снимка за опцияата"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "5.5pt 5.5pt 0pt 0pt",
                  display: "block",
                  marginBottom: "0px",
                  width: "100%",
                }}
              />
                <div className={styles.bottom_part}>
                  <p className={styles.option_text}>{option.option_text}</p>
                  <RadioButton about={option.option_text} />
                  <input type="hidden" name="option_id" value={option.id} />
                  {error && <p>{error.message}</p>}
                </div>
              </div>
            ))}
        </div>
          {
            poll?.status === "nezapocnala" ? (
              <p>Анкетата не е започнала все още, заради това няма да може да гласувате</p>
            ) : (
              <VoteButton userId={userId} pollId={fk} />
            )
          }
        </form>    
  )
}

export default VoteForm