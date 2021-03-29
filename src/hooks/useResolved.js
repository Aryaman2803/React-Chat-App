import { useState, useEffect } from "react";

//*Takes any number of input and check if each of them contains some values or undefined.
export const useResolved = (...vals) => {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setResolved(vals.every((v) => v !== undefined));
  }, [vals]);

  //Returns true if resolved otherwise false
  return resolved;
};
