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
  },
});

export const { addTweetsInStore } = tweetSlice.actions;

export const getTweetList = (state: RootState) =>
  state.tweets.tweetList;
export const getCurrentPage = (state: RootState) =>
  state.tweets.currentPage;
export const getTotalPages = (state: RootState) =>
  state.tweets.totalPages;

export default tweetSlice.reducer;
