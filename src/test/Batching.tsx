import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { mutateImmutable } from "../features/slice.ts";

const Batching = ()=>{
    const dispatch = useDispatch();
    
    const batchClick = ()=>{
        console.log('Batch action initiated');
        dispatch(mutateImmutable())
        dispatch(mutateImmutable())
        dispatch(mutateImmutable())
        dispatch(mutateImmutable())
    }
    return(
        <Button onClick={batchClick}>4 Actions</Button>
    )
}

export default Batching