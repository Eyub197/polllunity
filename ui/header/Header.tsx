import styles from '@/ui/header/Header.module.css'
import Logo from "../logo/Logo"
import Nav from './Nav';
import HeaderButtons from "./HeaderButtons";
import { getCurrentUserRole } from '@/lib/utils/user';

/**
 * Header component that renders the logo and navigation buttons
 */
const Header = async () => {
    // Retrieve the current user's role from the server
    const currentUserRoleData = await getCurrentUserRole()


    return (
        <header className={styles.header}>
            {/* Render the logo */}
            <Logo />
            {/* Render the navigation bar */}
            <Nav
                // Pass the current user's role to the Nav component to
                // determine which links to show
                currentUserRole={currentUserRoleData!}
            >
                {/* Render the buttons that are displayed on the right side of the header */}
                <HeaderButtons />
            </Nav>
        </header>
    )
}

export default Header