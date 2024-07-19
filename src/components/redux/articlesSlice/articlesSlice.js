import { createSlice } from '@reduxjs/toolkit';
import { fetchArticleList, fetchArticleSinglePage } from './fetchArticles';

const initialState = {
  articles: [],
  articleSinglePage: null,
  currentPage: 1,
  articlesCount: null,
  errorMessage: null,
  status: null,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(fetchArticleList.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticleList.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.error.message;
      })
      .addCase(fetchArticleSinglePage.pending, (state) => {
        state.articleSinglePage = [];
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(fetchArticleSinglePage.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.articleSinglePage = action.payload.article;
      })
      .addCase(fetchArticleSinglePage.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.error.message;
      });
  },
});

export const { setCurrentPage } = articleSlice.actions;
export default articleSlice.reducer;
