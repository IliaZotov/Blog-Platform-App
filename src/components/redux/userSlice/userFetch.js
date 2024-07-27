import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';

export const fetchCreateUser = createAsyncThunk(
  'users/fetchCreateUser',
  async (user, { rejectWithValue }) => {
    try {
      const BASE_URL = 'https://blog.kata.academy/api/users';
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ user }),
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
