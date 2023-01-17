import { useEffect, useState } from "react";

export default function useDebounce(initValue = "", delay) {
  const [debounceValue, setDebounceValue] = useState(initValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initValue]);
  return debounceValue;
}
