import { configureStore } from '@reduxjs/toolkit';
import { articleApi } from './api';
import articleReducer from './reducers/articleSlice';

const store = configureStore({
  reducer: {
    article: articleReducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware),
});

export default store;
