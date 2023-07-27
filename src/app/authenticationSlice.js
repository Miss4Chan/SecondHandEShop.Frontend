// app/authenticationSlice.js

import { createSlice, createAction } from '@reduxjs/toolkit';

export const userAuthenticatedError = createAction('userAuthenticatedError');

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || '',
    isLoggedIn: Boolean(localStorage.getItem('token')),
  },
  reducers: {
    userAuthenticated: (state, action) => {
      // Update the token and email in localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('email', action.payload.email);
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        isLoggedIn: true,
      };
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      return {
        token: '',
        email: '',
        isLoggedIn: false,
      };
    },
  },
});

export const { userAuthenticated, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
