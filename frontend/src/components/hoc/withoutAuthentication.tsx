import useRedirectAuthenticatedUser from "../../hooks/useRedirectAuthenticatedUser";

const withoutAuthentication = (Component: any) => {
  const Auth = ({ props }: any) => {
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

export default withoutAuthentication;
