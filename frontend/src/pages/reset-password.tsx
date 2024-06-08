import Head from "next/head";
import { site } from "../components/config/site";
import withoutAuthentication from "../components/hoc/withoutAuthentication";
import ResetPasswordModule from "../components/auth/resetpassword/ResetPasswordModule";
import AuthLayout from "../components/global/authLayout";
import MetaTags from "../components/config/MetaTags";

const ResetPassword = () => {
  return (
    <>
      <MetaTags title="Rest Password" />
      <AuthLayout>
        <ResetPasswordModule />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(ResetPassword);
