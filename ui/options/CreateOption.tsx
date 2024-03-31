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
                    <Option 
                    key={option.id}
                    option_text={option.option_text} 
                    votes_count={option.votes_count} 
                    image={option.image}
                    />)
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
                    <Dropdown arrayData={polls!} label="Изберете анкета" selected={undefined} className="option" />
                </div>
                <ImagePicker label={"снимка"} name={"image"}/>
                <Button className="create_option" action={"Създай"} inAction={"Създава се..."}/>
            </form>
        <>
                {createOptionElements() || <p>Не сте създали опции</p>}
            </>
        </>
    )
}



export default CreateOption