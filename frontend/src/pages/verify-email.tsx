import Head from "next/head";
import { site } from "../components/config/site";
import withoutAuthentication from "../components/hoc/withoutAuthentication";
import AuthLayout from "../components/global/authLayout";
import VerifyEmailModules from "../components/auth/verifyEmail";
import MetaTags from "../components/config/MetaTags";

const OtpVarification = () => {
  return (
    <>
      <MetaTags title="OTP Varification" />
      <AuthLayout>
        <VerifyEmailModules />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(OtpVarification);
