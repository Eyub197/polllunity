import styles from './RadioButton.module.css'

interface RadioButtonProps {
    about: string
}

/**
 * RadioButton component
 *
 * @param {RadioButtonProps} props
 * @returns {JSX.Element}
 */
const RadioButton = ({ about }: RadioButtonProps) => {
  // This component renders a radio button with a label associated with it
  // The id and name of the radio button are set to the value of the about prop
  // The value of the radio button is also set to the value of the about prop

  return (
    <div className={styles.radio}>
      <input
        type="radio"
        id={about}
        name="option_text"
        value={about}
      />
      <label htmlFor={about} />
    </div>
  );
};

export default RadioButton