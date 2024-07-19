import styles from './App.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutContent from '../Layout-Content/Layout-Content';
import ArticleList from '../Article-List/Article-List';
import ArticleSinglePage from '../Article-SinglePage/Article-SinglePage';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

function App() {
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path='/' element={<LayoutContent />}>
          <Route index element={<Navigate to='/articles' replace />} />
          <Route path='articles' element={<ArticleList />} />
          <Route path='/articles/:slug' element={<ArticleSinglePage />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
