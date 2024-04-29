import Link from "next/link";
import styles from "./ButtonLink.module.css"


interface ButtonLinkProps {
    className: string;
    children: React.ReactNode;
    to:string
}

/**
 * Component for button links.
 *
 * @param className - css class name for styling
 * @param children - content of the button
 * @param to - where to redirect
 */
const ButtonLink = ({ className, children, to }: ButtonLinkProps) => {
    // renders a link with className and children as content
    // and redirects to `to` prop when clicked
    return(
        <Link
            className={`${styles[className]}  ${styles.btn_link}`}
            href={to}
        >
            {children}
        </Link>
    )
}




export default ButtonLink
