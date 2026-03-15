import { useEffect, useState } from "react";

export function useIsMounted(): boolean {
  const [value, setValue] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(true);
  }, []);

  return value;
}
