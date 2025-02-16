import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  articlesCount: 0,
  loading: false,
  error: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle: (state, action) => ({
      ...state,
      articles: action.payload.articles,
      articlesCount: action.payload.articlesCount,
      loading: false,
      error: null,
    }),
  },
});

export const { setArticle } = articleSlice.actions;
export default articleSlice.reducer;
