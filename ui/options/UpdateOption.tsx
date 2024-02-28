import { Id } from "@/lib/types"
import { updateOptionById } from "@/lib/utils/options"


const UpdateOption =  ({id} : Id) => {
    const updateOption = updateOptionById.bind(null, id)

    return(
        <form action={updateOption}>
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
    )
}

export default UpdateOption