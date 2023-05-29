import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, update, reset } from "./testSlice";

function CustomMessage({msg}){
    
    let test = useSelector(state=> state.test)
    let dispatch = useDispatch()
    const incremetCounter = () => {
        dispatch(increment())
    }
    const decremetCounter = () => {
        dispatch(decrement())
    }
    const updateCounter = (val) => {
        dispatch(update(val))
    }
    const resetCounter = () => {
        dispatch(reset())
    }


    return (
        <>
        <h1>{msg}</h1>
        {test.loading}
            <br />
            <button onClick={()=>{incremetCounter()}}>Increment</button>
            <br />
            <button onClick={()=>{decremetCounter()}}>Decrement</button>
            <br />
            <div>
                <label htmlFor="">Enter a counter</label>
                <br />
                <input type="number" value={test.counter} onChange={(e)=>{updateCounter(e.target.value)}} />
            </div>
            <br />
            <button onClick={()=>{resetCounter()}}>Reset</button>

            
        </>
    );
}

export default CustomMessage;