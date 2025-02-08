import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <img src="/public\logo.png" alt=""/>
            <div>
                <h2>Important Links</h2>
                <div className={styles.linksContainer}>
                    <Link className={styles.link} to={"./"}>Homepage</Link>
                    <Link className={styles.link} to={"/plates"}>Plates</Link>
                    <Link className={styles.link} to={"/profile"}>Profile</Link>
                </div>
            </div>
            <div>
                Developed by Emily Saucedo. 
                <a href="https://www.linkedin.com/in/emily-saucedo-b33778215/" target='_blank' className={styles.link}> Click here to see my profile!</a>
            </div>
        </footer>
    )
}