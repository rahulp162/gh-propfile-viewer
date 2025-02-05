import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './features/slice.ts';
import { logger } from 'redux-logger';

const store = configureStore({
  reducer: {
    slice: sliceReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(logger);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
