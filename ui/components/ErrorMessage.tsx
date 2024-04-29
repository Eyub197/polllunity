import styles from "@/ui/components/ErrorMessage.module.css"

export interface ErrorMessageProps {
    errorText: string | undefined,
    className:string
}

/**
 * Renders error message based on the given errorText and className
 * @param errorText Error message to be displayed
 * @param className Class name to be used for styling the component
 * @returns JSX.Element
 */
const ErrorMessage = ({ errorText, className }: ErrorMessageProps) => {
    // renders error message component based on the given errorText and className
    // className is used to style the component based on the given class
    return (
        <p className={`${styles[className]} ${styles.error_message}`}>{errorText}</p>
    );
}

export default ErrorMessage