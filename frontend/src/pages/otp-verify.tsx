import Head from "next/head";
import { site } from "../components/config/site";
import withoutAuthentication from "../components/hoc/withoutAuthentication";
import AuthLayout from "../components/global/authLayout";
import OtpVerificationModules from "../components/auth/otpVerification";
import MetaTags from "../components/config/MetaTags";

const OtpVarification = () => {
  return (
    <>
      <MetaTags title="OTP Verification" />
        <AuthLayout>
          <OtpVerificationModules />
        </AuthLayout>
    </>
  );
};
export default withoutAuthentication(OtpVarification);
