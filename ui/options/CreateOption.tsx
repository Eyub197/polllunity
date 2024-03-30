import { createOption, deleteOption, getOptions } from "@/lib/utils/options"
import { DeleteButtonServer, EditButton } from "../Buttons"

const CreateOption = async () => {
    const options = await getOptions()
    
    const createOptionElements = async () => {

        if(options?.length! > 0){
            return (options?.map(option => {
                const deleteFunction = deleteOption.bind(null, option.id)
                
                return(
                <div key={option.id}>
                    <p>{option.option_text}</p>
                    <p>{option.polls.title}</p>
                    <EditButton id={option.id} toEdit="options"/>
                    <DeleteButtonServer action={deleteFunction} id={option.id} helper={null}/>
                </div> )
                
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