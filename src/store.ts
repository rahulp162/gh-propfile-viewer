import { autoBatchEnhancer, configureStore, createDynamicMiddleware, createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';
import sliceReducer from './features/slice.ts';
import { logger } from 'redux-logger';
import rateLimit from './features/rateLimit.middleware.ts';
import errorHandler from './features/errorHandler.middleware.ts';
import cacheMiddleware from './features/cache.middleware.ts';
import listenerMiddleware from './features/listener.middleware.ts';
// import immutableMiddleware from './features/immutable.middleware.ts';

const dynMiddleware = createDynamicMiddleware()
const immutableMW = createImmutableStateInvariantMiddleware({
  ignoredPaths:['immutable']
});

const store = configureStore({
  reducer: {
    slice: sliceReducer,
  },
  middleware: (getDefaultMiddleware)=>{
    return getDefaultMiddleware(
      {
        immutableCheck: true,
        serializableCheck:true,
        autoBatch: { type:'raf' },
      }
    )
    .concat(listenerMiddleware.middleware)
    .concat(immutableMW)
    .concat(logger)
    .concat(rateLimit)
    .concat(errorHandler)
    .concat(cacheMiddleware)
    .concat(dynMiddleware.middleware)
  },
  enhancers(getDefaultEnhancers) {
    return getDefaultEnhancers().concat(autoBatchEnhancer())
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
