import { configureStore} from '@reduxjs/toolkit';
import productsSlice from './productsSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';

export const store = configureStore({
  reducer: {
    productsSlice : productsSlice
  },
  // we concatenate our middleware to the default one
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
