import styles from "@/ui/options/OptionForm.module.css"
import Image from "next/image"

/**
 * This component renders an option in the results page.
 * 
 * @param className - className for the div wrapper
 * @param classNameContainer - className for the container of the option
 * @param children - children elements
 * @param image - image of the option
 * @param option_text - text of the option
 * @param votes_count - number of votes the option has
 * @param poll_id - id of the poll the option is in
 */
const Option = ({
    className,
    classNameContainer,
    children,
    image,
    option_text,
    votes_count,
    poll_id,
}: any) => {
    return (
        <div className={`${styles.option} ${styles[classNameContainer!]}`}>
            {/* If there is an image, display it */}
            {image && image !== undefined && (
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
            )}
            {/* Render the option */}
            <div className={`${styles[className!]} ${styles.bottom_part}`}>
                <p className="mt-0">Брой гласове: {votes_count}</p>
                <p>Текст на опцията: {option_text}</p>
                <p>На анкета: {poll_id}</p>
                {children}
            </div>
        </div>
    )
}

export default Option