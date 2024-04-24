import OptionsComponent from "@/ui/options/optionComponents/OptionsComponent"


const VotingPage = ({ params }: { params: { id: string } }) => {
    const { id } = params

    return <OptionsComponent fk={id}/>

}

export default  VotingPage

