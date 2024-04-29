import ThanksForVoting from "@/ui/thanksForVoting/ThanksForVoting"

/**
 * The thanks page for when the user has voted.
 *
 * @param {Object} params The route parameters, with the poll id in `params.id`
 * @returns {JSX.Element} The thanks page
 */
const ThanksPage = ({ params }: { params: { id: string } }) => {
    const { id } = params

    /**
     * Renders the thanks page with the given poll id.
     *
     * @param {string} id The id of the poll the user has voted for
     * @returns {JSX.Element} The thanks page
     */
    const renderThanksPage = (id: string): JSX.Element => (
        <ThanksForVoting id={id} />
    )

    return renderThanksPage(id)
}

export default ThanksPage

