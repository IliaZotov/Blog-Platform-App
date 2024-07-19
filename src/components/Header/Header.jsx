import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.titleLink} to='/'>
        <h1 className={styles.title}>Realworld Blog</h1>
      </Link>
      <div className={styles.buttons}>
        <Link className={styles.titleLink} to='sign-in'>
          <button type='button' className={styles.signIn}>
            Sign In
          </button>
        </Link>

        <Link className={styles.titleLink} to='sign-up'>
          <button type='button' className={styles.signUp}>
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
