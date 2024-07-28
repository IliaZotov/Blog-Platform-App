import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewArticle from '../../New-Article/NewArticle';
import { fetchCreateArticle } from '../../redux/articlesSlice/fetchArticles';

const NewArticlePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = ({ title, description, body }, tagsValue) => {
    console.log(tagsValue);
    dispatch(
      fetchCreateArticle({ title, description, body, tagList: tagsValue }),
    );
    navigate('/articles');
  };

  return (
    <div>
      <NewArticle title={'Create New Article'} onFormSubmit={onSubmit} />
    </div>
  );
};

export default NewArticlePage;
