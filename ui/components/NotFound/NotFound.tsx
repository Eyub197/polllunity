import styles from "@/ui/components/NotFound/NoteFound.module.css"
import Image from "next/image"
import magnifyingGlass from "@/public/noPolls.webp"

interface NotFoundProps {   
    text: string
}
const NotFound = ({ text } : NotFoundProps) => {
   return(
        <section>
            <Image 
            src={magnifyingGlass}
            alt="снимка на лупа"
            style={{
                maxWidth: "400px",
                width: "100%",
                height: "auto",
                marginLeft: "auto",
                marginRight: "auto"
            }}
        />
        <p className={styles.not_found}> Няма {text} с тези филтри или няма създадени такива</p>
        </section>
   )
}

export default NotFound