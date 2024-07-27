import { Button, Popconfirm, Statistic } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  fetchDeleteArticle,
  fetchFavoriteArticle,
  fetchUnFavoriteArticle,
} from '../redux/articlesSlice/fetchArticles';
import formatDate from '../utils/formatDate';
import userpic from './userpic.png';
import styles from './Article-Preview.module.scss';

const ArticlePreview = ({ article, isSinglePage }) => {
  const { username } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setFavorite] = useState(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);

  const onDelete = () => {
    dispatch(fetchDeleteArticle(article.slug));
    navigate('/');
  };

  const onClickFavorite = () => {
    if (!username) return;
    dispatch(fetchFavoriteArticle(article.slug)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setFavorite(true);
        setFavoritesCount(favoritesCount + 1);
      }
    });
  };

  const onClickUnfavorite = () => {
    if (!username) return;
    dispatch(fetchUnFavoriteArticle(article.slug)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setFavorite(false);
        setFavoritesCount(favoritesCount - 1);
      }
    });
  };

  const tags = article.tagList.map((tag, i) => {
    const trimmedTag = tag ? tag.trim() : '';

    if (trimmedTag !== '') {
      return (
        <li key={i}>
          <span className={styles.tag}>{trimmedTag}</span>
        </li>
      );
    }
    return (
      <li key={i}>
        <span className={styles.tag}>{'...'}</span>
      </li>
    );
  });

  const img = article.author.image ? article.author.image : userpic;

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <Link to={`/articles/${article.slug}`} className={styles.linkTitle}>
            <h3 className={styles.title}>{article.title}</h3>
          </Link>
          <Statistic
            className={styles.likes}
            valueStyle={{ fontSize: '16px' }}
            value={favoritesCount}
            prefix={
              !isFavorite ? (
                <HeartOutlined onClick={onClickFavorite} />
              ) : (
                <HeartFilled
                  style={{ color: 'red' }}
                  onClick={onClickUnfavorite}
                />
              )
            }
          />
        </div>

        <div className={styles.user}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{article.author.username}</span>
            <span className={styles.date}>{formatDate(article.createdAt)}</span>
          </div>
          <img src={img} alt='user pic' className={styles.userPic} />
        </div>
      </header>

      <div className={styles.tagsContainer}>
        <ul className={styles.tagsList}>{tags}</ul>
      </div>

      <div className={styles.content}>
        <p className={isSinglePage ? styles.textSinglePage : styles.text}>
          {article.description}
        </p>
        {isSinglePage && username === article.author.username ? (
          <div className={styles.buttonsContainer}>
            <Popconfirm
              description='Are you sure to delete this article?'
              onConfirm={onDelete}
              cancelText='No'
              okText='Yes'
            >
              <Button type='danger' className={styles.deleteButton}>
                Delete
              </Button>
            </Popconfirm>
            <Button
              type='dashed'
              className={styles.editButton}
              onClick={() => navigate(`/articles/${article.slug}/edit`)}
            >
              Edit
            </Button>
          </div>
        ) : null}
      </div>

      {isSinglePage ? (
        <ReactMarkdown className={styles.body}>{article.body}</ReactMarkdown>
      ) : null}
    </div>
  );
};

export default ArticlePreview;
