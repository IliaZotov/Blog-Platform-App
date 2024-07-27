import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NewArticle from '../../New-Article/NewArticle';
import { fetchUpdateArticle } from '../../redux/articlesSlice/fetchArticles';

const EditArticlePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const articleData = useSelector(
    (state) => state.articleSlice.articleSinglePage,
  );
  const onSubmit = ({ title, description, body }, tagList) => {
    const data = { body: { title, description, body, tagList }, slug };
    dispatch(fetchUpdateArticle(data));
    navigate('/');
  };

  return (
    <div>
      <NewArticle
        title='Edit Article'
        initialData={articleData}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default EditArticlePage;
