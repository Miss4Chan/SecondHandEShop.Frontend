import { configureStore} from '@reduxjs/toolkit';
import productsSlice from './productsSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';
import authenticationSlice from './authenticationSlice';

export const store = configureStore({
  reducer: {
    authenticationSlice : authenticationSlice,
    productsSlice : productsSlice
  },
  // we concatenate our middleware to the default one
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
