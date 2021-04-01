//* This hook helps to stop submitting search query  multiple times.
//*when finding a username to add to a group
//* Which avoid self DDOS

import { useEffect,useState } from "react";

//* It takes delay in ms. before we make the request to search the user
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};
