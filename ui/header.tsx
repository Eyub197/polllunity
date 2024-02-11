import Link from "next/link"
import Image from "next/image"

const Header = () => {
    return(
        <header>
            <Image 
            src={"Logo.svg"}
            alt="website logo"
            width={92}
            height={82}
            >

            </Image>
        </header>
    )
}

export default Header