import styles from './Article-Preview.module.scss';
import userpic from './userpic.png';
import formatDate from '../utils/formatDate';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ArticlePreview = ({ article, isSinglePage }) => {
  const tags = article.tagList.map((tag, i) => {
    const trimmedTag = tag ? tag.trim() : '';

    if (trimmedTag !== '') {
      return (
        <li key={i}>
          <span className={styles.tag}>{trimmedTag}</span>
        </li>
      );
    } else
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
          <span className={styles.likeIcon}>♡</span>
          <span className={styles.likes}>{article.favoritesCount}</span>
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
        <p className={ isSinglePage ? styles.textSinglePage : styles.text}>{article.description}</p>
      </div>
      {isSinglePage ? (
        <ReactMarkdown className={styles.body}>{article.body}</ReactMarkdown>
      ) : null}
    </div>
  );
};

export default ArticlePreview;
