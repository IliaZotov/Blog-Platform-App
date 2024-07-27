import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCreateUser,
  fetchGetUser,
  fetchLoginUser,
  fetchUpdateUser,
} from './userFetch';
import { deleteCookie } from '../../utils/cookie';

const initialState = {
  username: '',
  bio: '',
  image: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutProfile: (state) => {
      state.username = '';
      state.image = '';
      state.email = '';
      deleteCookie('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.email = action.payload.user.email;
        document.cookie = `token=${action.payload.user.token}`;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.bio = action.payload.user.bio;
        state.image = action.payload.user.image;
        state.email = action.payload.user.email;
        document.cookie = `token=${action.payload.user.token}`;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.image = action.payload.user.image;
        state.email = action.payload.user.email;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.image = action.payload.user.image;
        state.email = action.payload.user.email;
        document.cookie = `token=${action.payload.user.token}`;
      });
  },
});

export const { logOutProfile } = userSlice.actions;
export default userSlice.reducer;
