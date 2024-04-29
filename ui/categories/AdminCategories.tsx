import styles from "@/ui/categories/Categories.module.css"
import CategoryForm from "./CategoryForm"
import NavigationButton from "../components/NavigationButton/NavigationButton"
import {  deleteCategory, getCategories } from "@/lib/utils/category"
import { EditButton} from "../Buttons"
import { DeleteButtonServer } from "../Buttons"

/**
 * AdminCategories component renders all the categories in the system
 */
const AdminCategories = async () => {
    // fetch all the categories from the database
    const  {categories}  = await getCategories()

    /**
     * createCategoriesElements - helper function that renders all the categories
     *
     * @returns {JSX.Element[]} - Returns an array of JSX elements
     */
    const createCategoriesElements = () => {
        // return an empty array if there are no categories
        if(!categories?.length){
            return []
        }
        // map all the categories to JSX elements
        return categories.map(category => {
            // bind the id of the category to the delete function
            const deleteFunction = deleteCategory.bind(null, category.id)
            return(
                // render a div with the category information
                <div className={styles.container} key={category.id}>
                    <h2>Име: <span className={styles.normal}> {category.name}</span></h2>
                    <h3>Описание: <span className={styles.normal}> {category.description || "няма описание"}</span></h3>
                    <section className={styles.actions_container}>
                        {/* render edit button with the id of the category */}
                        <EditButton id={category.id} toEdit="kategorii"/>
                        {/* render delete button with the delete function and the id of the category */}
                        <DeleteButtonServer action={deleteFunction} id={category.id} helper={null}/>
                    </section>
                </div>
            )
        })
    }

    return(
        <>
            <h1 className="title"> Категории </h1>
            <section className="navigation">
                <NavigationButton to="/admin" className="helper" text="табло" back={true}/>
                <NavigationButton to="opcii" className="helper" text="опции" back={false}/>
                <NavigationButton to="anketi" className="helper" text="анкети" back={false}/>
            </section>
            <main className={styles.main}>
                {/* render form to create a new category */}
                <CategoryForm action={"create"}/>
                <h2 className="title_2">Висички категории</h2>     
                <section className={styles.categories_container}>
                    {/* call the helper function and render the JSX elements */}
                    {createCategoriesElements() || <p>Няма създадени категории</p>}
                </section> 
            </main>
        </> )
}


export default AdminCategories