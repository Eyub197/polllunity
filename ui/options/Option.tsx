import { Option as OptionProps } from "@/lib/types"
import styles from "@/ui/options/OptionForm.module.css"
import Image from "next/image"

const Option = ({className, classNameContainer, children, image, option_text, votes_count, poll_id}: any) => {
    return(
        <div className={`${styles.option} ${styles[classNameContainer!]}`}>
            {image && image !== undefined &&
            (
                <Image
                src={`https://knefgqtvaywusxthuztg.supabase.co/storage/v1/object/public/images/${image}`}
                alt="консепцуална снимка за избор на опцията"
                width={500}
                height={300}
                style={{
                    objectFit: "cover",
                    height: "auto",
                    maxHeight: "300px",
                    width: "100%",
                    borderRadius: "5.5pt 5.5pt 0pt 0pt",
                    display: "block",
                    marginBottom: "0px",
                }}
                />
            )            
        }
            <div className={`${styles[className!]} ${styles.bottom_part}` }>
                <p className="mt-0">Брой гласове: {votes_count}</p>
                <p>Текст на опцията: {option_text}</p> 
                <p>На анкета: {poll_id}</p>           
                {children}
            </div>
        </div>
    )

}

export default Option