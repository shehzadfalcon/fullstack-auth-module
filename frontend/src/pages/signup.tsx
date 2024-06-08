import Head from "next/head";
import { site } from "../components/config/site";
import withoutAuthentication from "../components/hoc/withoutAuthentication";
import AuthLayout from "../components/global/authLayout";
import LoginModule from "../components/auth/login/LoginModule";
import MetaTags from "../components/config/MetaTags";
import SignupModule from "../components/auth/signup/SignUpModule";

const SignUp = () => {
  return (
    <>
      <MetaTags title="OTP Varification" />

      <AuthLayout>
        <SignupModule />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(SignUp);
