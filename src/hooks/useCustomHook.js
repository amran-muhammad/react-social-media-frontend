import { useEffect, useState } from "react"

function useCustomHook (name, value) {
    
    const setLocalStorage = (name,value) => {
        localStorage.setItem(name,JSON.stringify(value))
    }
    const getLocalStorage = (name) => {
        let val = JSON.parse(localStorage.getItem((name)))
        return val ? val : 1
    }
    const [counter, setCounter] = useState(getLocalStorage(name))
    
    useEffect(()=>{
        setLocalStorage(name,counter)
    },[counter])
    
    return [counter, setCounter]
}
export default useCustomHook