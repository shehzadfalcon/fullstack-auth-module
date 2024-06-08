/**
 * Custom hook to determine the logged-in status of the user.
 * It returns an array containing two elements:
 * - isLoggedIn: A boolean indicating whether the user is logged in or not.
 * - isLoading: A boolean indicating whether the hook is still loading or not.
 */
import { useEffect, useState } from "react";
import { getCookie } from "../utils/getCookie";

const useLoggedInStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fullName = getCookie("fullName")?.split("_").join(" ");
  useEffect(() => {
    /**
     * Function to check if the user is logged in.
     * It sets the state variables isLoggedIn and isLoading accordingly.
     */
    const checkLoggedIn = () => {
      const token = getCookie("token");
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    // Call the function to check the logged-in status when the component mounts
    checkLoggedIn();
  }, []);

  // Return the logged-in status and loading status
  return [isLoggedIn, isLoading, fullName];
};

export default useLoggedInStatus;
