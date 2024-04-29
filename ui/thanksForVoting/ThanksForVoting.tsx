import { Id } from "@/lib/types"
import { getPollById } from "@/lib/utils/polls"
import Link from "next/link"
import styles from "@/ui/thanksForVoting/ThanksForVoting.module.css"
import { FaCheck } from "react-icons/fa";

/**
 * Component that displays a message to the user after they have successfully voted on a poll.
 *
 * @param {Id} props - The props passed to the component
 * @param {Id.id} props.id - The id of the poll the user has voted on
 * @returns {JSX.Element} The component to be rendered
 */
const ThanksForVoting = async ({ id }: Id) => {
    // Get the poll with the given id
    const poll = await getPollById(id);

    return (
        <main className={styles.main}>
            {/* Check icon to indicate a success message */}
            <FaCheck className={styles.icon_check} />
            {/* Message thanking the user for voting */}
            <h1 className={styles.thanks_message}>
                Благодарим ви за участието в анкетата{" "}
                {/* Title of the poll the user voted on */}
                <span className="pc">{poll?.polls?.title}</span>
            </h1>
            {/* Message indicating that the user's vote was processed successfully */}
            <p className={styles.helper_message}>
                Вашия глас беше обработен успешно
            </p>
            {/* Button redirecting the user to the polls page */}
            <Link href={"/anketi"}>
                <button className={styles.button}>Други анкети</button>
            </Link>
        </main>
    );
};

export default ThanksForVoting