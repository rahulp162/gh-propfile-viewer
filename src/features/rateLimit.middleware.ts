import { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const timeStamps: Record<string, number> = {};

const rateLimit: Middleware = () => (next:any) => (action:any) => {
    const currentTime = Date.now();
    const lastRequestTime = timeStamps[action.type] || 0;
    const timeSinceLastRequest = currentTime - lastRequestTime;
    if(timeSinceLastRequest < 50){
        toast.error("thats 1 letter per 50ms, too fast!");
        return Promise.resolve(); 
    }
    timeStamps[action.type] = currentTime;
    return next(action);
}

export default rateLimit;