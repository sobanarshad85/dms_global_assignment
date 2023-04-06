import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Tweet {

  id: string;
  created_at: string;
  text: string;
  user: User;
  likes_count: number;
  replies_count: number;
  like_by_me: boolean;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  company_name: string;
}


export const tweetApi = createApi({
  reducerPath: 'tweetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dmsglobal.net/ct-api/',
    prepareHeaders: (headers, { getState }) => {
      const token = '8U7dPDoiozxF26WNLAdJdo2S9KN7wwg58Dub0v9D'
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => {
    return {
      getTweetList: builder.query<any, number>({
        query: (currentPage = 1) => `timeline?page=${currentPage}`,
      }),
      toggleTweetLike: builder.mutation<Tweet, { data: FormData, isLiked: boolean }>({
        query: (payload) => ({
          url: payload?.isLiked ? '/unlike' : '/like',
          method: 'POST',
          body: payload?.data,
        }),
      }),
    };
  },
});

export const { useLazyGetTweetListQuery, useToggleTweetLikeMutation } = tweetApi;
