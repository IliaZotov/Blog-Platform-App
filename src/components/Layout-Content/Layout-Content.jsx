import Header from '../Header/Header';
import styles from './Layout-Content.module.scss';
import { Outlet } from 'react-router';

const LayoutContent = () => {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};

export default LayoutContent;
