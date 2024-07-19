import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';

export const fetchArticleList = createAsyncThunk(
  'articles/fetchArticlesList',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      // console.log('Запрос начинается'); // Лог перед началом запроса

      const token = getCookie('token');
      const BASE_URL = 'https://blog.kata.academy/api/articles';
      const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      // console.log('Ответ получен, проверка статуса'); // Лог после получения ответа

      if (!res.ok) {
        // console.error('Ошибка запроса: статус ответа не ок'); // Лог при ошибке статуса ответа
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      // console.log('Данные получены', data); // Лог после получения данных
      return data;
    } catch (err) {
      // console.error('Ошибка в блоке catch', err); // Лог при ошибке в блоке catch
      return rejectWithValue(err.message);
    }
  }
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
      console.log('fetchArticleSinglePage>>> Ответ получен, проверка статуса'); // Лог после получения ответа

      if (!res.ok) {
        console.error(
          'fetchArticleSinglePage>>> Ошибка запроса: статус ответа не ок'
        ); // Лог при ошибке статуса ответа
        throw new Error('fetchArticleSinglePage>>> Ошибка запроса');
      }

      const data = await res.json();
      console.log('fetchArticleSinglePage>>> Данные получены', data); // Лог после получения данных
      return data;
    } catch (err) {
      console.error('fetchArticleSinglePage>>> Ошибка в блоке catch', err); // Лог при ошибке в блоке catch
      return rejectWithValue(err.message);
    }
  }
);
