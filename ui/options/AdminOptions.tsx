import { DeleteButtonServer, EditButton } from "../Buttons"
import Option from "./Option"
import Dropdown from "../components/dropdown/Dropdown"
import OptionForm from "./OptionForm"
import { deleteOption, getOptions, getPollDropDownInfo } from "@/lib/utils/options"
import styles from "@/ui/options/OptionForm.module.css"
import Search from "../components/Search/Search"

interface Poll {
    id: string;
    title: string;
  }
  
  interface Option {
    id: string;
    image: string | null;
    option_text: string;
    poll_id: string;
    votes_count: number | null;
    polls?: Poll;
  }

  const AdminOptions = async ({query} : {query : string}) => {
   console.log(`console.logged ${query}`)
   const options = await getOptions()
   const polls = await getPollDropDownInfo()
    const createOptionElements = () => {
        if(options?.length! > 0){
            return (options?.map(option => {
                const deleteFunction = deleteOption.bind(null, option?.id, option?.image!)
                return(
                    <div key={option?.id}>
                        <Option 
                        image={option?.image || undefined}
                        option_text={option?.option_text} 
                        votes_count={option?.votes_count} 
                        >
                        <div className={styles.buttons}>
                            <EditButton id={option?.id} toEdit={"options"} />
                            <DeleteButtonServer id={option?.id} helper={null} action={deleteFunction} />
                        </div>
                        </Option>
                    </div>
                    )
                })
            )
        }        
    }    

    return(
        <>
        <h1 className="title">Опции</h1>
        <main className={styles.main}>
            <OptionForm
            action="create"
            image={undefined}
            >
                <div>
                    <Dropdown about="poll_id" arrayData={polls!} className={"input"} label="Изберете анкетата" selected={undefined}/>
                </div>
            </OptionForm>
            <h2 className="title_2">Всички опции</h2>
        <Search placeholder="Търси опция"/>
            <section className={styles.options}>
                {createOptionElements() || <p>Не сте създали опции</p>}
            </section>
        </main>
        </>
    )
}

export default AdminOptions