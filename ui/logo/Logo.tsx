import Image from "next/image"
import styles from "@/ui/logo/Logo.module.css"
import logoImage from "@/public/Logo.svg"
import Link from "next/link"

/**
 * Logo component
 *
 * This component renders the website's logo,
 * with a link to the home page.
 */
const Logo = () => {
    // JSX element to be returned
    return (
        // Link to the home page
        <Link href={"/"}>
            {/* Container for logo and text */}
            <div className={styles.logo_container}>
                {/* Website name */}
                <h3 className={styles.logo_text}>
                    Poll <span className={styles.logo_text_detail}>Unity</span>
                </h3>

                {/* Logo image */}
                <Image
                    // CSS class for logo image
                    className={styles.logo}
                    // Path to logo image
                    src={logoImage}
                    // Alternative text for logo image
                    alt="website logo"
                    // Width of logo image
                    width={43}
                    // Height of logo image
                    height={40}
                />
            </div>
        </Link>
    )
}

export default Logo