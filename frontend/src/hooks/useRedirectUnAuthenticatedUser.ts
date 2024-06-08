/**
 * Redirects unauthenticated users away from authenticated routes.
 * If an unauthenticated user tries to access an authenticated route,
 * they will be redirected to the login page.
 */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "../utils/getCookie";

import { EAUTH_ROUTES, EUN_AUTH_ROUTES } from "../enums/routes.enum";

const useRedirectUnAuthenticatedUser = (): void => {
  const router: any = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = getCookie("token");

    // Check if the current route is an unauthenticated route
    const isUnauthenticatedRoute = Object.values(EAUTH_ROUTES).includes(
      router.pathname
    );

    // If the user is authenticated and the current route is unauthenticated,
    // redirect the user to the home page
    if (isAuthenticated && isUnauthenticatedRoute) {
      const route = EUN_AUTH_ROUTES.LOGIN as string;
      router.push(route);
    }
  }, []);
};

export default useRedirectUnAuthenticatedUser;
