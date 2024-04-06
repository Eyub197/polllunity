import { Option as OptionProps } from "@/lib/types"
import styles from "@/ui/options/OptionForm.module.css"
import Image from "next/image"
import noImage from "@/public/no-image.webp"

const Option = ({className ,children, image, option_text, votes_count}: OptionProps) => {
    return(
        <div className={styles.option}>
            {image && image !== undefined ? 
            (
                <Image
                src={`https://knefgqtvaywusxthuztg.supabase.co/storage/v1/object/public/images/${image}`}
                alt="консепцуална снимка за избор на опцията"
                width={250}
                height={150}
                style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    minHeight: "200px",
                    width: "100%",
                    borderRadius: "5.5pt 5.5pt 0pt 0pt",
                    display: "block",
                    marginBottom: "0px"     
                }}
            />
            )
            :
            (
                <Image 
                src={noImage}
                width={250}
                height={150}
                alt="снимка за избор без снимка"
                style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    minHeight: "200px",
                    width: "100%",
                    borderRadius: "5.5pt 5.5pt 0pt 0pt",
                    display: "block",
                    marginBottom: "0px"     
                }}
                />
            )



            }
            <div className={`${styles[className!]} ${styles.bottom_part}` }>
                <p className="mt-0">Брой гласове: {votes_count}</p>
                <p>Текст на опцията: {option_text}</p>            
                {children}
            </div>
        </div>
    )
}

export default Option