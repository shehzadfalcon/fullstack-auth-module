import useRedirectAuthenticatedUser from "../../hooks/useRedirectAuthenticatedUser";
import useRedirectUnAuthenticatedUser from "../../hooks/useRedirectUnAuthenticatedUser";

const withAuthentication = (Component: any, showHeader: boolean = false) => {
  const Auth = ({ props, showHeader }: any) => {
    useRedirectAuthenticatedUser();
    return (
      <>
        <Component {...props} />
      </>
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuthentication;
