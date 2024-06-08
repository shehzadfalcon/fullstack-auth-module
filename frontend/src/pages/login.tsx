import Head from "next/head";
import LoginModule from "../components/auth/login/LoginModule";
import withoutAuthentication from "../components/hoc/withoutAuthentication";
import AuthLayout from "../components/global/authLayout";
import MetaTags from "../components/config/MetaTags";

const Login = () => {
  return (
    <>
      <MetaTags title="Login" />
      <AuthLayout>
        <LoginModule />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(Login);
