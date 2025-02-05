import { Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const errorHandler:Middleware =()=>(next:any)=>(action:any)=>{
    if(action.type.endsWith("/rejected")){
        toast.error(action.error.message);
    }
    return next(action);
}

export default errorHandler;
