import Image from "next/image"
import styles from "@/ui/logo/Logo.module.css"
import logoImage from "@/public/Logo.svg"
import Link from "next/link"

const Logo = () => {
    return(
        <>
        <Link href={"/"}>
        <div className={styles.logo_container}>
            <h3 className={styles.logo_text}>Poll <span className={styles.logo_text_detail}>Unity</span></h3>

            <Image
            className={styles.logo}
            src={logoImage}
            alt="website logo"
            width={43}
            height={40}
            />
        </div>
        </Link>
        </>
    )

}

export default Logo