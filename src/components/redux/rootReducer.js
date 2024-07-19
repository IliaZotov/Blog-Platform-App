import { combineReducers } from 'redux';
import articleSlice from './articlesSlice/articlesSlice';
import userSlice from './userSlice/userSlice';

const rootReducer = combineReducers({ articleSlice, userSlice });

export default rootReducer;
