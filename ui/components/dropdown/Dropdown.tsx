import styles from "@/ui/components/dropdown/Dropdown.module.css"

export interface ChooseCategoryProps {
    selected?: string | undefined,
    label: string,
    className?: string | undefined | null,
    arrayData?: any[] | undefined,
    about?: string
}


const Dropdown = async ({ selected, label, className, arrayData, about }: ChooseCategoryProps) => {
    // Creates the options for the dropdown based on the array data.
    const createOptions = () => {
        if (arrayData) {
            return arrayData?.map(data => {
                // Creates an option element for each piece of data.
                return (
                    <option
                        // Sets the key to a unique value based on the data.
                        key={data.title || data.name || data.text}
                        // Sets the value of the option to the id of the data.
                        value={data.id}
                    >
                        {/* Sets the text of the option to the title, name, or text of the data. */}
                        {data.title || data.name || data.text}
                    </option>
                )
            })
        }
    }

    return (
        <>
            {/* The label for the dropdown */}
            <label htmlFor={about}>{label}</label>
            <select
                // Sets the default value of the select to the selected value.
                defaultValue={selected || undefined}
                // Adds the class names for the dropdown.
                className={`admin_inputs ${styles.select} ${styles[className!]} `}
                // Sets the name of the field to the about parameter.
                name={about}
                // Sets the id of the field to the about parameter.
                id={about}
            >
                {/* Creates the options for the dropdown */}
                {createOptions()}
            </select>
        </>
    )
}
export default Dropdown