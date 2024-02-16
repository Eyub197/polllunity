import Image from "next/image"
import styles from "@/ui/logo.module.css"

const Logo = () => {
    return(
    <>
        <div className={styles.logo_container}>
      
            <h3 className={styles.logo_text}>Poll <span className={styles.logo_text_detail}>Unity</span></h3>

            <Image 
            className={styles.logo}
            src={"logo.svg"}
            alt="website logo"
            width={41}
            height={37}>
            </Image>

        </div>
    </>
    )
}

export default Logo