import Dropdown from "@/ui/components/dropdown/Dropdown"
import PollForm from "@/ui/polls/PollForm"
import { getPollById } from "@/lib/utils/polls"
import styles from "@/ui/polls/Poll.module.css"
import { getCategories } from "@/lib/utils/category"
import { getCurrentUserRole } from "@/lib/utils/user"
import { redirect } from "next/navigation"

/**
 * This component renders edit poll page
 * @param {{params: {id: string}}} props - destructured props object
 * @returns {JSX.Element} - react jsx
 */
const EditPoll = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    // fetch poll by id and categories
    const { polls } = await getPollById(id);
    const { categories } = await getCategories();

    // check if user is admin
    const currentUserRole = await getCurrentUserRole();
    if (currentUserRole !== "admin") {
        redirect("/");
    }

    return (
        <main className={styles.main}>
            {/* render PollForm with action="update" */}
            <PollForm
                action="update"
                title={polls?.title}
                image={polls?.image!}
                id={id}
            >
                {/* render Dropdown with label="Изберете категория" and arrayData={categories} */}
                <div className={styles.category_id}>
                    <Dropdown
                        about="category_id"
                        arrayData={categories!}
                        className="input"
                        label="Изберете категория"
                        selected={undefined}
                    />
                </div>
            </PollForm>
        </main>
    );
};

export default EditPoll