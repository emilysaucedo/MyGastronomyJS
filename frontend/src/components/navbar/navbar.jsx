import styles from './navbar.module.css'
import { LuShoppingBasket } from 'react-icons/lu';
import { LuUser, LuMenu } from "react-icons/lu";
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false) /*atualizar estado dos componentes*/
    
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu) //se ta aberto fecha, se ta fechado abre
    }

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItems}>
                <Link to={'/'}>
                    <img className={styles.logo} src="/logo.png" alt=""></img>
                </Link>
                
                <div className={styles.navbarLinksContainer}>

                    <Link to={'/'} className={styles.navbarLink}>Home</Link>
                    <Link to={'/plates'} className={styles.navbarLink}>Plates</Link>
                    <Link to={'/cart'}>
                        <LuShoppingBasket className={styles.navbarLink}/>
                    </Link>
                    <Link to={'/profile'}>
                        <LuUser className={styles.navbarLink}/>
                    </Link>
                    
                </div>
            </div>

            <div className={styles.mobileNavbarItems}>
                <Link to={'/'}>
                    <img className={styles.logo} src="/logo.png" alt=""></img>
                </Link>
                
                <div className={styles.mobileNavbarBtns}>
                <Link to={'/cart'}>
                    <LuShoppingBasket className={styles.navbarLink}/>
                </Link>
                <Link to={'/plates'}>
                    <LuMenu className={styles.navbarLink} onClick={handleOpenMenu}/>
                </Link>
                

                </div>
            </div>
            <Drawer
            anchor='right'
            open={openMenu}
            onClose={handleOpenMenu}
            >
                <div className={styles.drawer}>
                    <Link to={'/'} className={styles.navbarLink} onClick={handleOpenMenu}>Home</Link>
                    <Link to={'/plates'} className={styles.navbarLink} onClick={handleOpenMenu}>Plates</Link>
                    <Link to={'/profile'} className={styles.navbarLink} onClick={handleOpenMenu}>Profile</Link>
                </div>

            </Drawer>

        </nav>
    )
}