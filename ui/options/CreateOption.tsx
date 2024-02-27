import { createOption, getOptions } from "@/lib/utils/options"
import { DeleteOptionButton } from "../buttons"


const CreateOption = async () => {
    const options = await getOptions()
    
    console.log(options)
    const createOptionElements = async () => {

        if(options?.length! > 0){
            return (options?.map(option => 
                <div>
                    <p>{option.option_text}</p>
                    <p>{option.polls.title}</p>
                    <DeleteOptionButton id={option.id}/>
                </div> ))
        }

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