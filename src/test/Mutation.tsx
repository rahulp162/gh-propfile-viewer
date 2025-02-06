import { Button } from "@mui/material"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { mutateImmutable } from "../features/slice.ts";
import { RootState } from "../store.ts";
import { useSelector } from "react-redux";
import Listener from "./Listener.tsx";
import Batching from "./Batching.tsx";


const Mutation = ()=>{
    const dispatch = useDispatch()
    const {immutable} = useSelector((state:RootState)=>state.slice)
    const handleImmutable = ()=>{
        dispatch(mutateImmutable())
      }
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
        </div>
    )
}
export default Mutation