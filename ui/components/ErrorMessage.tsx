import styles from "@/ui/components/ErrorMessage.module.css"

export interface ErrorMessageProps {
    errorText: string | undefined,
    className:string
}

const ErrorMessage = ({errorText, className}: ErrorMessageProps) => {
    return(
        <p className={`${styles[className]} ${styles.error_message}`}> {errorText} </p>
    )
}

export default ErrorMessage