import styles from '@/ui/header/header.module.css'
import Logo from "../logo"
import Nav from './Nav';
import HeaderButtons from "./HeaderButtons";

const Header = () => {
 
    return(
        <header className={styles.header}>
           <Logo />
            <Nav>
                <HeaderButtons  />                
            </Nav>  
        </header>
    )
}

export default Header