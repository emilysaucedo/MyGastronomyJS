import styles from './navbar.module.css'
import { LuShoppingBasket } from 'react-icons/lu';
import { LuUser, LuMenu } from "react-icons/lu";
import { Drawer } from '@mui/material';
import { useState } from 'react';

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false) /*atualizar estado dos componentes*/
    
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu) //se ta aberto fecha, se ta fechado abre
    }

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItems}>
                <img className={styles.logo} src="/logo.png" alt=""></img>
                <div className={styles.navbarLinksContainer}>
                    <a href='' className={styles.navbarLink}>Home</a>
                    <a href='' className={styles.navbarLink}>Plates</a>
                    <LuShoppingBasket className={styles.navbarLink}/>
                    <LuUser className={styles.navbarLink}/>
                </div>
            </div>

            <div className={styles.mobileNavbarItems}>
                <img className={styles.logo} src="/logo.png" alt=""></img>
                <div className={styles.mobileNavbarBtns}>
                <LuShoppingBasket className={styles.navbarLink}/>
                <LuMenu className={styles.navbarLink} onClick={handleOpenMenu}/>
                </div>
            </div>
            <Drawer
            anchor='right'
            open={openMenu}
            onClose={handleOpenMenu}
            >
                <div className={styles.drawer}>
                    <a href='' className={styles.navbarLink}>Home</a>
                    <a href='' className={styles.navbarLink}>Plates</a>
                    <a href='' className={styles.navbarLink}>Profile</a>
                </div>

            </Drawer>

        </nav>
    )
}