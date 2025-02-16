import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset }) => ({
        url: 'articles',
        params: {
          limit,
          offset,
        },
      }),
      transformResponse: (response) => ({
        articles: response.articles,
        articlesCount: response.articlesCount,
      }),
    }),
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleQuery } = articleApi;
