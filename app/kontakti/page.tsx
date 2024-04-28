import NavigationButton from "@/ui/components/NavigationButton/NavigationButton"

const Contact = () => {
  return (
    <main>
      <NavigationButton to="/kontakti" text="Назад" back={true}/>
      <NavigationButton to="/kontakti" text="Назад" back={false}/>
    </main>
  ) 
}
export default Contact