import Image from "next/image"
import styles from "@/ui/logo.module.css"
import logoImage from "@/public/logo.svg"
import {prisma} from "@/lib/prisma"


const Logo = () => {
    return(
    <>
        <div className={styles.logo_container}>
            <h3 className={styles.logo_text}>Poll <span className={styles.logo_text_detail}>Unity</span></h3>

            <Image
            className={styles.logo}
            src={logoImage}
            alt="website logo"
            width={41}
            height={37}/>
        </div>
    </>
    )

}

export default Logo