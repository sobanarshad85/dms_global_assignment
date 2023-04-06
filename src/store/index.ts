import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tweetApi } from './api/tweetApi';
import tweetReducer from './tweetSlice';
import logger from 'redux-logger';

const reducers = combineReducers({
  tweets: tweetReducer,
  [tweetApi.reducerPath]: tweetApi.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tweetApi.middleware, logger),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof reducers>;
export default store;
