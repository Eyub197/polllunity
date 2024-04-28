import styles from "@/ui/categories/Categories.module.css"
import CategoryForm from "./CategoryForm"
import NavigationButton from "../components/NavigationButton/NavigationButton"
import {  deleteCategory, getCategories } from "@/lib/utils/category"
import { EditButton} from "../Buttons"
import { DeleteButtonServer } from "../Buttons"

const AdminCategories = async () => {
    const  {categories}  = await getCategories()
    const createCategoriesElements = () => {
        
        if(categories?.length! > 0){
            return(categories?.map(category => {
                const deleteFunction = deleteCategory.bind(null, category.id)      
            return(
                <div className={styles.container} key={category.id}>
                    <h2>Име: <span className={styles.normal}> {category.name}</span></h2>
                    <h3>Описание: <span className={styles.normal}> {category.description || "няма описание"}</span></h3>
                    <section className={styles.actions_container}>
                        <EditButton id={category.id} toEdit="kategorii"/>
                        <DeleteButtonServer action={deleteFunction} id={category.id} helper={null}/>
                    </section>
                </div>
            ) 
        }

        ))}
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
                <CategoryForm action={"create"}/>
                <h2 className="title_2">Висички категории</h2>     
                <section className={styles.categories_container}>
                    {createCategoriesElements() || <p>Няма създадени категории</p>}
                </section> 
            </main>
        </> )
}

export default AdminCategories