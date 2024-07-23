import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';

export const fetchCreateUser = createAsyncThunk(
  'users/fetchCreateUser',
  async (user, { rejectWithValue }) => {
    try {
      // console.log('Запрос начался', user);
      const BASE_URL = 'https://blog.kata.academy/api/users';
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ user }),
      });

      // console.log('Ответ получен, проверка статуса'); // Лог после получения ответа

      if (!res.ok) {
        console.error('Ошибка запроса: статус ответа не ок'); // Лог при ошибке статуса ответа
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

//{email: 'Jopa1488@gmail.com', password: 'Gjkysq[f[f1488'}

export const fetchLoginUser = createAsyncThunk(
  'users/fetchLoginUser',
  async (user, { rejectWithValue }) => {
    try {
      const BASE_URL = 'https://blog.kata.academy/api/users/login';
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ user }),
      });

      console.log('fetchLoginUser>>> Ответ получен, проверка статуса'); // Лог после получения ответа

      if (!res.ok) {
        console.error('fetchLoginUser>>>  Ошибка запроса: статус ответа не ок'); // Лог при ошибке статуса ответа
        throw new Error('fetchLoginUser>>> Ошибка запроса');
      }

      const data = await res.json();
      console.log('fetchLoginUser>>>  Данные получены', data); // Лог после получения данных
      return data;
    } catch (err) {
      console.error('fetchLoginUser>>>  Ошибка в блоке catch', err); // Лог при ошибке в блоке catch
      return rejectWithValue(err.message);
    }
  }
);

export const fetchGetUser = createAsyncThunk(
  'users/fetcthGetUser',
  async (_, { rejectWithValue }) => {
    try {
      const BASE_URL = 'https://blog.kata.academy/api/user';
      const res = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${getCookie('token')}`,
        },
      });

      console.log('fetchGetUser>>> Ответ получен, проверка статуса'); // Лог после получения ответа

      if (!res.ok) {
        console.error('Ошибка запроса: статус ответа не ок'); // Лог при ошибке статуса ответа
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      console.log('fetchGetUser>>> Данные получены', data); // Лог после получения данных
      return data;
    } catch (err) {
      console.error('fetchGetUser>>> Ошибка в блоке catch', err); // Лог при ошибке в блоке catch
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'users/fetchUpdateUser',
  async (user, { rejectWithValue }) => {
    try {
      const BASE_URL = 'https://blog.kata.academy/api/user';
      const res = await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${getCookie('token')}`,
        },
        body: JSON.stringify({ user }),
      });

      console.log('fetchUpdateUser>>> Ответ получен, проверка статуса'); // Лог после получения ответа

      if (!res.ok) {
        console.error(
          'fetchUpdateUser>>>  Ошибка запроса: статус ответа не ок'
        ); // Лог при ошибке статуса ответа
        throw new Error('fetchUpdateUser>>> Ошибка запроса');
      }

      const data = await res.json();
      console.log('fetchUpdateUser>>>  Данные получены', data); // Лог после получения данных
      return data;
    } catch (err) {
      console.error('fetchUpdateUser>>>  Ошибка в блоке catch', err); // Лог при ошибке в блоке catch
      return rejectWithValue(err.message);
    }
  }
);
