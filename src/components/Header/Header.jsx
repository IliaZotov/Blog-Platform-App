import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from '../utils/cookie';
import { fetchGetUser } from '../redux/userSlice/userFetch';
import { logOutProfile } from '../redux/userSlice/userSlice';
import userpic from '../Article-Preview/userpic.png';

const Header = () => {
  const {
    email: auth,
    image,
    username,
  } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('token')) dispatch(fetchGetUser());
  }, []);

  const logOut = () => {
    dispatch(logOutProfile());
    navigate('/');
  };

  const notAuthHeader = (
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
  );

  const authHeader = (
    <div className={styles.buttons}>
      <Link className={styles.titleLink} to='new-article'>
        <button type='button' className={styles.createAtricle}>
          Create article
        </button>
      </Link>

      <div className={styles.user}>
        <Link className={styles.userLink} to='profile'>
          <span className={styles.userName}>{username}</span>
          <img
            src={image ? image : userpic}
            alt='user pic'
            className={styles.userPic}
          />
        </Link>
      </div>

      <Link className={styles.titleLink} to='/'>
        <button
          type='button'
          className={styles.logOut}
          onClick={() => logOut()}
        >
          Log Out
        </button>
      </Link>
    </div>
  );

  return (
    <header className={styles.header}>
      <Link className={styles.titleLink} to='/'>
        <h1 className={styles.title}>Realworld Blog</h1>
      </Link>
      {auth ? authHeader : notAuthHeader}
    </header>
  );
};

export default Header;
