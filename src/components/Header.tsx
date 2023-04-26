import styles from '@/styles/Header.module.css';
import NavBar from './Navbar';
export default function Header () {

    return (
        <div className={styles.head}>
            <h1> Welcome to Local Events</h1>
            <NavBar />
        </div>
    )
}
