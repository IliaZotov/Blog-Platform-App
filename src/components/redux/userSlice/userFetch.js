import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCreateUser = createAsyncThunk(
  'users/fetchCreateUser',
  async (user, { rejectWithValue }) => {
    try {
      console.log('Запрос начался', user);
      const BASE_URL = 'https://blog.kata.academy/api/users';
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ user }),
      });

      console.log('Ответ получен, проверка статуса'); // Лог после получения ответа

      if (!res.ok) {
        console.error('Ошибка запроса: статус ответа не ок'); // Лог при ошибке статуса ответа
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      console.log('Данные получены', data); // Лог после получения данных
      return data;
    } catch (err) {
      console.error('Ошибка в блоке catch', err); // Лог при ошибке в блоке catch
      return rejectWithValue(err.message);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  'users/fetchLoginUser',
  async (user, { rejectWithValue }) => {
    try {
      const BASE_URL = 'https://blog.kata.academy/api/users/login';
      const res = await fetch(
        BASE_URL,
        {
          user,
        },
        { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
      );

      console.log('Ответ получен, проверка статуса'); // Лог после получения ответа

      if (!res.ok) {
        console.error('Ошибка запроса: статус ответа не ок'); // Лог при ошибке статуса ответа
        throw new Error('Ошибка запроса');
      }

      const data = await res.json();
      console.log('Данные получены', data); // Лог после получения данных
      return data;
    } catch (err) {
      console.error('Ошибка в блоке catch', err); // Лог при ошибке в блоке catch
      return rejectWithValue(err.message);
    }
  }
);
