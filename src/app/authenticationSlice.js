import { createSlice, createAction } from '@reduxjs/toolkit';
export const userAuthenticatedError = createAction('userAuthenticatedError');

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: '',
        email: '',
        isLoggedIn: false,
    },
    reducers: {
        userAuthenticated: (state, action) => {
            // add the token to the current session
            sessionStorage.setItem('token', action.payload.token);
            return {
                ...state, ...{
                    token: action.payload.token,
                    email: action.payload.email,
                    isLoggedIn: true,
                }
            }
        },
        logout: () => {
            sessionStorage.clear();
        }
    }
});

export const { userAuthenticated, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
