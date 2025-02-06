
const immutableMiddleware = ()=>(next:any)=>(action:any)=>{
    if(action.type.endsWith("/mutateImmutable")){
        // toast.error("Cannot mutate the Immutable!")
        
    }
    return next(action)
}

export default immutableMiddleware