import { createOption, deleteOption, getOptions } from "@/lib/utils/options"
import { DeleteButtonServer, EditButton } from "../Buttons"
import Option from "./Option"

const CreateOption = async () => {
    const options = await getOptions()
    
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
                }
            ))}
            
    }    

        return(
            <>
                <form action={createOption}>
                    <div>
                        <label htmlFor="option_text">text</label>  
                        <input type="text" id="option_text" name="option_text" />
                    </div>
                    <div>
                        <label htmlFor="poll_id">poll id</label>  
                        <input type="text" id="poll_id" name="poll_id" />
                    </div>
                    <button>action</button>
                </form>
            <>
                    {createOptionElements() || <p>Не сте създали опции</p>}
                </>
            </>
        )
}



export default CreateOption