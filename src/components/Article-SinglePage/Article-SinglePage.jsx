import styles from './Article-SinglePageContent.module.scss';
import ArticlePreview from '../Article-Preview/Article-Preview';
import Spinner from '../Spinner/Spinner';
import ErrorComponent from '../Error-Component/Error-Component';
import { fetchArticleSinglePage } from '../redux/articlesSlice/fetchArticles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const ArticleSinglePage = () => {
  const dispatch = useDispatch();
  const { articleSinglePage, status } = useSelector(
    (state) => state.articleSlice
  );
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchArticleSinglePage(slug));
  }, [dispatch, slug]);

  if (!articleSinglePage) return <ErrorComponent className={styles.error} />;
  if (status === 'loading') return <Spinner className={styles.spinner} />;

  return (
    <div className={styles.wrapper}>
      <ArticlePreview article={articleSinglePage} isSinglePage={true} />
    </div>
  );
};

export default ArticleSinglePage;
