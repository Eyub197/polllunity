import Option from "./Option"
import Dropdown from "../components/dropdown/Dropdown"
import OptionForm from "./OptionForm"
import Search from "../components/Search/Search"
import styles from "@/ui/options/OptionForm.module.css"
import NavigationButton from "../components/NavigationButton/NavigationButton"
import { deleteOption, getOptions, getPollDropDownInfo } from "@/lib/utils/options"
import { DeleteButtonServer, EditButton } from "../Buttons"
import NotFound from "../components/NotFound/NotFound"
import Filter from "../components/Filter/Filter"

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

  /**
   * AdminOptions page component
   * 
   * Renders all options,
   * creates new options form and
   * renders a section for filtering and
   * search.
   * 
   * @param {string} query - search query
   * @param {string} anketa - poll id
   * 
   * @returns {JSX.Element} - AdminOptions component
   */
  const AdminOptions = async ({
    query,
    anketa,
  }: {
    query: string;
    anketa?: string;
  }) => {
    // get options, polls dropdown info from server
    const options = await getOptions(anketa, query);
    const polls = await getPollDropDownInfo();

    /**
     * Creates Option components from options array
     * 
     * @returns {JSX.Element[] | undefined} - array of Option components or undefined
     */
    const createOptionElements = () => {
      // if options array is not empty, map it to Option components
      if (options?.length! > 0) {
        return options?.map((option) => {
          // bind delete function with option id and image params
          const deleteFunction = deleteOption.bind(
            null,
            option?.id,
            option?.image!
          );

          // render Option component with mapped data and buttons
          return (
            <div key={option?.id}>
              <Option
                image={option?.image || undefined}
                option_text={option?.option_text}
                votes_count={option?.votes_count}
                poll_id={option?.polls.title}
              >
                <div className={styles.buttons}>
                  <EditButton id={option?.id} toEdit={"opcii"} />
                  <DeleteButtonServer
                    id={option?.id}
                    helper={null}
                    action={deleteFunction}
                  />
                </div>
              </Option>
            </div>
          );
        });
      }
    };

    return (
      <>
        <h1 className="title">Опции</h1>
        <section className="navigation  ">
          <NavigationButton to="/admin" className="helper" text="табло" back={true} />
          <NavigationButton to="anketi" className="helper" text="анкети" back={false} />
          <NavigationButton to="kategorii" className="helper" text="категории" back={false} />
        </section>

        <main className={styles.main}>
          <OptionForm
            action="create"
            image={undefined}
          >
            <div>
              <Dropdown
                about="poll_id"
                arrayData={polls!}
                className={"input"}
                label="Изберете анкетата"
              />
            </div>
          </OptionForm>
          <h2 className="title_2">Всички опции</h2>
          <section className={styles.filters}>
            <Search placeholder="опция..." />
            <Filter pollParams={anketa!} />
          </section>
          <section className={styles.options}>
            {createOptionElements() || <NotFound text="опции" />}
          </section>
        </main>
      </>
    );
  };


export default AdminOptions