import { configureStore } from '@reduxjs/toolkit';
import { articleApi, authApi } from './api';
import articleReducer from './reducers/articleSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware, authApi.middleware),
});

export default store;
