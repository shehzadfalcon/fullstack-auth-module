import withoutAuthentication from "../components/hoc/withoutAuthentication";
import ForgotPasswordModule from "../components/auth/forgotPassword/ForgotPasswordModule";
import AuthLayout from "../components/global/authLayout";
import MetaTags from "../components/config/MetaTags";

const ForgotPassword = () => {
  return (
    <>
      <MetaTags title="Forgot Password" />
      <AuthLayout>
        <ForgotPasswordModule />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(ForgotPassword);
