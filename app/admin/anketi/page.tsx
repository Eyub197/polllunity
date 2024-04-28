import AdminPolls from "@/ui/polls/AdminPolls"

const PollForm = ({searchParams} : { searchParams?: {query?: string} }) => <AdminPolls query={searchParams?.query!}/>

export default PollForm