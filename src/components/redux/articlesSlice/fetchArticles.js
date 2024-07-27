import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';

export const fetchArticleList = createAsyncThunk(
  'articles/fetchArticlesList',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const token = getCookie('token');
      const BASE_URL = 'https://blog.kata.academy/api/articles';
      const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchArticleSinglePage = createAsyncThunk(
  'article, fetchArticleSinglePage',
  async (slug, { rejectWithValue }) => {
    try {
      const token = getCookie('token');
      const BASE_URL = 'https://blog.kata.academy/api/articles';
      const res = await fetch(`${BASE_URL}/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchCreateArticle = createAsyncThunk(
  'article, fetchCreateArticle',
  async (body, { rejectWithValue }) => {
    try {
      const token = getCookie('token');
      const BASE_URL = 'https://blog.kata.academy/api/articles';
      const res = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({ article: body }),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchDeleteArticle = createAsyncThunk(
  'article, fetchDeleteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const token = getCookie('token');
      const BASE_URL = 'https://blog.kata.academy/api/articles';
      const res = await fetch(`${BASE_URL}/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchUpdateArticle = createAsyncThunk(
  'article, fetchUpdateArticle',
  async ({ body, slug }, { rejectWithValue }) => {
    try {
      const token = getCookie('token');
      const BASE_URL = 'https://blog.kata.academy/api/articles';
      const res = await fetch(`${BASE_URL}/${slug}`, {
        method: 'PUT',
        body: JSON.stringify({ article: body }),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchFavoriteArticle = createAsyncThunk(
  'article, fetchFavoriteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const token = getCookie('token');
      const BASE_URL = 'https://blog.kata.academy/api/articles';
      const res = await fetch(`${BASE_URL}/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('fetchFavoritArticle>>> Ошибка запроса');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchUnFavoriteArticle = createAsyncThunk(
  'article, fetchUnFavoriteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const token = getCookie('token');
      const BASE_URL = 'https://blog.kata.academy/api/articles';
      const res = await fetch(`${BASE_URL}/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
