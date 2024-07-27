import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './App.module.scss';
import LayoutContent from '../Layout-Content/Layout-Content';
import ArticleList from '../Article-List/Article-List';
import ArticleSinglePage from '../Article-SinglePage/Article-SinglePage';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import NewArticlePage from '../pages/New-Article-Page/NewArticlePage';
import EditArticlepage from '../pages/Edit-Article-Page/EditArticlePage';

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
          <Route path='profile' element={<Profile />} />
          <Route path='new-article' element={<NewArticlePage />} />
          <Route path='/articles/:slug/edit' element={<EditArticlepage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
