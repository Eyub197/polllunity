import { createOption, deleteOption, getOptions } from "@/lib/utils/options"
import { DeleteButtonServer, EditButton } from "../Buttons"
import Option from "./Option"
import ImagePicker from "../components/ImagePicker"
import { Button } from "../ClientButtons"
import Dropdown from "../components/dropdown/Dropdown"
import { getCurrentPolls } from "@/lib/utils/polls"

const CreateOption = async () => {
    const options = await getOptions()
    const {polls} = await getCurrentPolls()    
    const createOptionElements = async () => {

        if(options?.length! > 0){
            return (options?.map(option => {
                const deleteFunction = deleteOption.bind(null, option.id)
                
                return(
                    <div key={option.id}>
                        <Option 
                        option_text={option.option_text} 
                        votes_count={option.votes_count} 
                        image={option.image}
                        />
                        <div>
                            <DeleteButtonServer id={option.id} helper={null} action={deleteFunction} />
                            <EditButton id={option.id} toEdit={"options"} />
                        </div>
                    </div>
                    )
                })
            )
        }        
    }    

    return(
        <>
            <form action={createOption}>
                <div>
                    <label htmlFor="option_text">Опция</label>  
                    <input 
                    type="text" 
                    id="option_text" 
                    name="option_text" 
                    className={`admin_inputs`}
                    />
                </div>
                <div>
                    <Dropdown about={"poll_id"} arrayData={polls!} label="Изберете анкета" selected={undefined} className="option" />
                </div>
                <ImagePicker label={"снимка"} name={"image"}/>
                <Button className="create_option" action={"Създай"} inAction={"Създава се..."}/>
            </form>
            <section>
                {createOptionElements() || <p>Не сте създали опции</p>}
            </section>
            
        </>
    )
}



export default CreateOption