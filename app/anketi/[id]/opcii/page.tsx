import OptionsComponent from "@/ui/options/optionComponents/OptionsComponent"


/**
 * This page is the main voting page for a poll. It renders the OptionsComponent
 * with the poll's ID as a prop.
 *
 * @param params The page's route parameters. It should contain the poll's ID
 * in the "id" key.
 * @returns The voting page component.
 */
const VotingPage = ({ params }: { params: { id: string } }) => {
    const { id } = params; // get the poll's ID

    /**
     * Render the OptionsComponent with the poll's ID as the foreign key (fk)
     * prop. This will render the options for the poll with the given ID.
     */
    return <OptionsComponent fk={id}/>;

}

export default  VotingPage

