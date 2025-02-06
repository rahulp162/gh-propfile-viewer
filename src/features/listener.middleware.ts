// listenerMiddleware.ts
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { listenThis } from './slice.ts';
import toast from 'react-hot-toast';

var listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: listenThis,
  effect: () => {
    toast.success("This is the side effect");
  }
});

export default listenerMiddleware;
