import styles from './RadioButton.module.css'

interface RadioButtonProps {
    about: string
}

const RadioButton = ({about} : RadioButtonProps) => {
    return(
        <div className={styles.radio}>
            <input 
            type="radio" 
            id={about} 
            name="option_text"
            value={about}
            />        
            <label htmlFor={about}></label>
        </div>
    )


}

export default RadioButton