import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ArticleCard from '../Article-Preview/Article-Preview';
import styles from './Article-List.module.scss';
import { Pagination } from 'antd';
import { fetchArticleList } from '../redux/articlesSlice/fetchArticles';
import { setCurrentPage } from '../redux/articlesSlice/articlesSlice';
import Spinner from '../Spinner/Spinner';
import ErrorComponent from '../Error-Component/Error-Component';

const ArticleList = () => {
  const dispatch = useDispatch();
  const { articles, currentPage, articlesCount, status } = useSelector(
    (state) => state.articleSlice
  );

  useEffect(() => {
    dispatch(fetchArticleList({ limit: 5, offset: (currentPage - 1) * 5 }));
  }, [dispatch, currentPage]);

  const articlesList = articles.map((article) => {
    return (
      <li key={article.slug}>
        <ArticleCard article={article} />
      </li>
    );
  });

  const spinner = status === 'loading' ? <Spinner className={styles.spinner}/> : null;
  const error =
    status === 'rejected' ? <ErrorComponent className={styles.error} /> : null;
  const pagination =
    status === 'resolved' ? (
      <Pagination
        className={styles.pagination}
        current={currentPage}
        total={articlesCount}
        pageSize={5}
        showSizeChanger={false}
        onChange={(page) => dispatch(setCurrentPage(page))}
      />
    ) : null;

  console.log(articlesList);

  return (
    <div className={styles.cardsListContainer}>
      <ul className={styles.cardsList}>
        {error}
        {spinner}
        {articlesList}
      </ul>
      <div>{pagination}</div>
    </div>
  );
};

export default ArticleList;
