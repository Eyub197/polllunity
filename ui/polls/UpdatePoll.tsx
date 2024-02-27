import { updatePollById } from "@/lib/utils/polls"


const UpdatePoll = ({id}: {id:string}) => {

    const updatePoll = updatePollById.bind(null, id)

    return(
        <>
        <form action={updatePoll}>
            <div>
                <label htmlFor="title">title</label>
                <input type="text" id="title" name="title" />
            </div>
            <div>
                <label htmlFor="starts_at">starts at</label>
                <input type="datetime-local" id="starts_at" name="starts_at" />
            </div>
            <div>
                <label htmlFor="ends_at">ends at</label>
                <input type="datetime-local" id="ends_at" name="ends_at" />
            </div>
            <div>
                <label htmlFor="category_id">category id</label>
                <input type="text" id="category_id" name="category_id" />
            </div>
            <div>
                <label htmlFor="description">description</label>
                <textarea name="description" id="description" placeholder="optional description..."></textarea>
            </div>

            <button>action</button>
        </form>
    </>
    )
}

export default UpdatePoll