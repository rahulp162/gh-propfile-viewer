import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { listenThis } from "../features/slice.ts"

const Listener = ()=>{
    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch(listenThis())
    }
    return(
        <Button onClick={handleClick}>Listener Middleware</Button>
    )
}

export default Listener