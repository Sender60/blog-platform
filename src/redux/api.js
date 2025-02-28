import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    setArticle: builder.mutation({
      query: (article) => ({
        url: 'articles',
        method: 'POST',
        body: { article },
      }),
    }),
  }),
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted({ queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          if (result && result.data) {
            console.log(result.data);
            localStorage.setItem('token', result.data.user.token);
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'users',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted({ queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result && result.data) {
            localStorage.setItem('token', result.data.user.token);
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
      transformResponse: (response) => response.user,
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: 'user',
        method: 'PUT',
        body: credentials,
      }),
      transformResponse: (response) => response.user,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleQuery, useSetArticleMutation } = articleApi;

export const { useLoginMutation, useRegisterMutation, useGetUserQuery, useUpdateUserMutation } = authApi;
