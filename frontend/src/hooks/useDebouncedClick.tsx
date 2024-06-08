import { useState } from "react";

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export const useDebouncedClick = <T,>(
  setState?: SetStateFunction<T>
): [
  (
    callback?: () => Promise<void>,
    key?: string,
    param?: T,
    startLoading?: boolean,
    timer?: number // Additional parameter to indicate whether to start loading
  ) => void,
  Record<string, boolean>
] => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleClick = async (
    callback?: () => Promise<void>,
    key?: string,
    param?: T,
    startLoading = true, // Default to true if not provided
    timer = 3000 // Default timer value
  ) => {
    if (startLoading) {
      // Check if loading should start
      setLoadingStates({ ...loadingStates, [key || "default"]: true });
    }

    if (callback) {
      await callback(); // Call the callback function without any arguments
      if (param !== undefined && setState) {
        setState(param);
      }
    }
    setTimeout(
      () => setLoadingStates({ ...loadingStates, [key || "default"]: false }),
      timer
    ); // Set loading to false after the specified timer
  };

  return [handleClick, loadingStates];
};
