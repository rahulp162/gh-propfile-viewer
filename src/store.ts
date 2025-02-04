import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './features/slice.ts';

const store = configureStore({
  reducer: {
    slice: sliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
