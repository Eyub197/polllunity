import Link from "next/link"
import styles from "./ButtonLink.module.css"


interface ButtonLinkProps {
    className: string;
    children: React.ReactNode;
    to:string
}

const ButtonLink = ({ className, children, to }: ButtonLinkProps) => {
    return(
        <Link className={`${styles[className]}  ${styles.btn_link}`} href={to}>{children}</Link>
    )
}


export default ButtonLink
