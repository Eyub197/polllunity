import styles from '@/ui/header/header.module.css'
import Logo from "../logo"
import Nav from './Nav';
import HeaderButtons from "./HeaderButtons";
import { getCurrentUserRole } from '@/lib/utils/user';

const Header = async() => { 
    const currentUserRoleData = await getCurrentUserRole()


    return(
        <header className={styles.header}>
           <Logo />
            <Nav  currentUserRole={currentUserRoleData!}>
                <HeaderButtons  />                
            </Nav>  
        </header>   
    )
}

export default Header