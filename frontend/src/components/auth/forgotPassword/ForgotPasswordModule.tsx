import React, { useState } from "react";
import Input from "../../global/forms/Input";
import { Button } from "../../global/button/Button";
import { useRouter } from "next/router";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import {
  IForgotPassword,
  forgotPasswordSchema,
} from "../../../validations/auth/forgotPasswordValidatation";
import { useFormik } from "formik";
import { authService } from "../../../services/auth.service";
import { toast } from "react-toastify";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";
import { errorHandler } from "../../../utils/errorHandler";
/**
 * Component for handling forgot password functionality.
 * @returns {JSX.Element} JSX element for forgot password form.
 */
const ForgotPasswordModule = (): JSX.Element => {
  const router = useRouter();

  const [handleClick, loadingStates] = useDebouncedClick();

  // Formik hook for form handling
  const formik = useFormik<IForgotPassword>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    validateOnBlur: true,
    /**
     * Submit handler for forgot password form.
     * @param {IForgotPassword} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     */
    onSubmit: async (values, { resetForm, setFieldError }) => {
      handleClick(async () => {
        try {
          const response = await authService.forgotPasswordHandler(values);
          toast.success(response?.message);
          resetForm();
          let route = UN_AUTHENTICATED_ROUTES.VERIFY_OTP as Function;
          router.push(route(values.email));
        } catch (error: unknown) {
          errorHandler(error, setFieldError);
        }
      }, "loading");
    },
  });
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      formik.handleSubmit();
      e.preventDefault(); // Prevent the default behavior of Enter (form submission)
    } else if (e.key === "Enter" && e.shiftKey) {
      formik.handleSubmit();
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="mb-10">
        <legend className="fs-32 mb-2 text-center font-semibold text-white">
          Forgot Password
        </legend>
        <p className="text-center text-sm text-white">
          Enter your account&apos;s email address and we&apos;ll send you a
          4-digit code to reset your password
        </p>
      </div>
      <div className="form-group mb-8">
        <Input
          type="email"
          name="email"
          onKeyDown={handleInputKeyDown}
          label={"Email"}
          placeholder={"Email"}
          formik={formik}
        />
      </div>
      <div className="form-group mb-12">
        <Button
          size="lg"
          type="button"
          color="primary"
          disabled={loadingStates["loading"]}
          isLoading={loadingStates["loading"]}
          onClick={formik.handleSubmit}
          className="w-full"
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default ForgotPasswordModule;
