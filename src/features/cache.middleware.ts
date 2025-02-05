import { Middleware } from "@reduxjs/toolkit";

const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const cacheMiddleware: Middleware = () => (next:any) => (action:any) => {
    if (action.type.endsWith('/fulfilled')) {
        const cacheKey = action.type + JSON.stringify(action.meta.arg);
        cache[cacheKey] = {
            data: action.payload,
            timestamp: Date.now()
        };
    }

    if (action.type.endsWith('/pending')) {
        const cacheKey = action.type.replace('/pending', '/fulfilled') + JSON.stringify(action.meta.arg);
        const cachedData = cache[cacheKey];

        if (cachedData && 
            (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
            return Promise.resolve({
                ...action,
                type: action.type.replace('/pending', '/fulfilled'),
                payload: cachedData.data
            });
        }
    }

    return next(action);
};

export default cacheMiddleware;