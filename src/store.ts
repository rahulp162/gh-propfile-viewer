import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './features/slice.ts';
import { logger } from 'redux-logger';
import rateLimit from './features/rateLimit.middleware.ts';
import errorHandler from './features/errorHandler.middleware.ts';

const store = configureStore({
  reducer: {
    slice: sliceReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
    .concat(logger)
    .concat(rateLimit)
    .concat(errorHandler)
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
