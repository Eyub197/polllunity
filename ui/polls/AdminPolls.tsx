import Image from "next/image"
import PollForm from "./PollForm"
import Dropdown from "../components/dropdown/Dropdown"
import pollStyles from "@/ui/polls/Poll.module.css"
import MoreInformation from "../components/moreInformation/MoreInformation"
import noImage from "@/public/no-image.webp"
import Link from "next/link"
import Search from "../components/Search/Search"
import NavigationButton from "../components/NavigationButton/NavigationButton"
import NotFound from "../components/NotFound/NotFound"
import { deletePoll, getPolls } from "@/lib/utils/polls"
import { DeleteButtonServer, EditButton } from "../Buttons"
import { getCategories } from "@/lib/utils/category"

/**
 * The admin panel for polls
 * @param query the search query
 * @returns The admin panel for polls
 */
const AdminPolls = async ({ query }: { query: string }) => {
  // Get the polls and categories from the database
  const { polls } = await getPolls(query);
  const { categories } = await getCategories();

  /**
   * Create the polls elements
   * @returns The polls elements
   */
  const createPollsElements = () => {
    // If there are polls, map them to polls elements,
    // otherwise display a not found message
    if (polls?.length! > 0) {
      return polls?.map((poll) => {
        const { id, title, starts_at, ends_at, categories, image, description } = poll;
        // Bind the delete function to the id and image of the poll
        const deleteFunction = deletePoll.bind(null, id, image!);
        return (
          <div className={pollStyles.poll} key={id}>
            {/* If there is an image, display it, otherwise display a placeholder image */}
            {image && image !== undefined ? (
              <Image
                width={400}
                height={300}
                src={`https://knefgqtvaywusxthuztg.supabase.co/storage/v1/object/public/images/${image}`}
                alt="snimka na anketa"
                className={pollStyles.poll_image}
              />
            ) : (
              <Image
                width={400}
                height={300}
                src={noImage}
                alt="snimka na anketa"
                className={pollStyles.poll_image}
              />
            )}
            <div className={pollStyles.bottom_part}>
              <h2>{title}</h2>
              <div className={pollStyles.info}>
                <h3>Категория: {categories?.name}</h3>
                <MoreInformation description={description || "няма допълнителна информация"} />
              </div>
              <p>започва на: {starts_at}</p>
              <p>завършва на:{ends_at}</p>
              <div className={pollStyles.buttons}>
                <EditButton id={id} toEdit="anketi" />
                <DeleteButtonServer action={deleteFunction} id={id} helper={null} />
                <Link href={`/anketi/${id}/rezultati`}>Резултати</Link>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <>
      <h1 className="title">Анкети</h1>
      <section className="navigation">
        <NavigationButton to="/admin" className="helper" text="табло" back={true} />
        <NavigationButton to="opcii" className="helper" text="опции" back={false} />
        <NavigationButton to="kategorii" className="helper" text="категории" back={false} />
      </section>

      <main className={pollStyles.main}>
        <PollForm
          image={undefined}
          action="create"
        >
          <div className={pollStyles.category_id}>
            <Dropdown
              about="category_id"
              arrayData={categories!}
              className={"input"}
              label="Изберете категория"
              selected={undefined}
            />
          </div>
        </PollForm>
        <h2 className={"title_2"}>Всички анкети</h2>
        <Search placeholder=" анкета" />
        <section className={pollStyles.polls}>
          {/* Call the create polls elements function and display the result,
                or display a not found message */}
          {createPollsElements() || <NotFound text="анкети" />}
        </section>
      </main>
    </>
  );
};


export default AdminPolls