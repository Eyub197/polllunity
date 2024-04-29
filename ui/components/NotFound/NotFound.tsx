import styles from "@/ui/components/NotFound/NoteFound.module.css"
import Image from "next/image"
import magnifyingGlass from "@/public/noPolls.webp"

interface NotFoundProps {   
    text: string
}
/**
 * NotFound component
 * @param text - text to display in the component
 * @returns JSX.Element
 */
const NotFound = ({ text }: NotFoundProps) => {
    // display image and message when there is no search results
    return (
        <section>
            <Image
                src={magnifyingGlass}
                alt="image of a magnifying glass"
                style={{
                    maxWidth: "400px",
                    width: "100%",
                    height: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            />
            <p className={styles.not_found}>
                {/* display message when there are no search results */}
                Няма {text} с тези филтри или няма създадени такива
            </p>
        </section>
    );
}

export default NotFound