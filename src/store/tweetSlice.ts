import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Tweet } from './api/tweetApi';

interface TweetState {
  tweetList: Tweet[];
  totalPages: number;
  currentPage: number;
}

const initialState: TweetState = {
  tweetList: [],
  totalPages: 10,
  currentPage: 1,
};

export const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    addTweetsInStore: (state, action: PayloadAction<{ result: Tweet[], totalPages: number }>) => {
      state.tweetList = [...state.tweetList, ...action.payload.result];
      state.totalPages = action.payload.totalPages;
      state.currentPage = state.currentPage < state.totalPages ? state.currentPage + 1 : 10
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const { tweetList } = state;
      const index = tweetList.findIndex(tweet => tweet.id === action.payload);
      if (index !== -1) {
        const newTweets = [...tweetList];
        const tweet = newTweets[index];
        newTweets[index] = {
          ...tweet,
          like_by_me: !tweet.like_by_me,
          likes_count: tweet.like_by_me ? tweet.likes_count - 1 : tweet.likes_count + 1,
        };
        state.tweetList = newTweets;
      }
    },
  },
});

export const { addTweetsInStore, toggleLike } = tweetSlice.actions;

export const getTweetList = (state: RootState) =>
  state.tweets.tweetList;
export const getCurrentPage = (state: RootState) =>
  state.tweets.currentPage;
export const getTotalPages = (state: RootState) =>
  state.tweets.totalPages;

export default tweetSlice.reducer;
