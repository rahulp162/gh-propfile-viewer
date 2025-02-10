import { Button } from "@mui/material"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { intentionalError, mutateImmutable } from "../features/slice.ts";
import { AppDispatch, RootState } from "../store.ts";
import { useSelector } from "react-redux";
import Listener from "./Listener.tsx";
import Batching from "./Batching.tsx";
import { nanoid } from "@reduxjs/toolkit";


const Mutation = ()=>{
    const dispatch = useDispatch<AppDispatch>()
    const {immutable} = useSelector((state:RootState)=>state.slice)
    const handleImmutable = ()=>{
      dispatch(mutateImmutable())
    }
    const handleNanoId = ()=>{
      const id = nanoid();
      toast.success(`generated nanoid: ${id}`);
    }
    const handleMSE = async () => {
      try {
        const result = await dispatch(intentionalError()).unwrap(); // `.unwrap()` throws if the thunk fails
        console.log("Thunk result:", result);
      } catch (err:any) {
        console.error("Caught Error:", err);
        toast.error(`Error: ${err.message || "Something went wrong"}`);
      }
    };
    
    const handleImmutableIllegle = ()=>{
      // try{
      //   immutable+=10;
      // }catch(err:any){
      //   toast.error(err.message)
      // }
      toast.error("Not allowed")
    }
    return(
        <div className='absolute top-10 left-10 flex flex-col items-center justify-start'>
            <div>
            immutable-state: {immutable} 
            </div>
            <Button onClick={handleImmutable} className='' >mutation by action</Button>
            <Button onClick={handleImmutableIllegle} className='' >direct mutation</Button>
            <Batching/>
            <Listener/>
            <Button onClick={handleNanoId} >Generate nanoid</Button>
            <Button onClick={handleMSE}>Test MiniSerializeError</Button>
        </div>
    )
}
export default Mutation