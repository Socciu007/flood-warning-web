import { useEffect, useState } from "react";


export const useDebounceHooks = (value, delay) => {
  const [valueDebounce, setValueDebounce] = useState('')
  useEffect(()=>{
    const handle = setTimeout(()=> {
      setValueDebounce(value)
    }, [delay])
    return () => {
      clearTimeout(handle)
    }
  }, [value, delay])
    return valueDebounce;
}