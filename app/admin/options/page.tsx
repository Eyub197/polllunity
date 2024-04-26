import AdminOptions from "@/ui/options/AdminOptions";

const OptionsForm = ({searchParams} : { searchParams?: {query?: string} }) => <AdminOptions query={searchParams?.query!}/>
    
export default OptionsForm