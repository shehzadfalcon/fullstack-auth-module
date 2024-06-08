import React, { useState } from "react";
import Input from "../../global/forms/Input";
import { Button } from "../../global/button/Button";
import {
  IResetPassword,
  resetPasswordSchema,
} from "../../../validations/auth/resetPasswordValidation";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { authService } from "../../../services/auth.service";
import { toast } from "react-toastify";
import NiceModal from "@ebay/nice-modal-react";
import { errorHandler } from "../../../utils/errorHandler";

const ResetPasswordModule = () => {
  const { query } = useRouter();

  const [handleClick, loadingStates] = useDebouncedClick();

  // Formik hook for form handling
  const formik = useFormik<IResetPassword>({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: resetPasswordSchema,
    validateOnBlur: true,
    /**
     * Submit handler for updating password.
     * @param {IResetPassword} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     */
    onSubmit: async (values, { resetForm, setFieldError }) => {
      handleClick(async () => {
        try {
          let otp = query.otp as string;
          if (!otp) {
            toast.error("OTP is required");
            return;
          }
          await authService.resetPasswordHandler({
            password: values.password,
            otp: otp,
            confirm_password: "",
          });
          resetForm();
          NiceModal.show("updatePassword");
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
          Reset Your Password
        </legend>
        <p className="text-center text-sm text-white">
          Enter your new password and you are good to go.
        </p>
      </div>
      <div className="form-group mb-4">
        <Input
          name="password"
          type="password"
          onKeyDown={handleInputKeyDown}
          label={"Password"}
          placeholder="New Password"
          formik={formik}
          className="text-blackrussian pr-[50px]"
        />
      </div>

      <div className="form-group mb-8">
        <Input
          type="password"
          name="confirm_password"
          onKeyDown={handleInputKeyDown}
          label={"Confirm Password"}
          placeholder={"Confirm Password"}
          formik={formik}
          className="text-blackrussian pr-[50px]"
        />
      </div>
      <div className="form-group">
        <Button
          size="md"
          color="primary"
          disabled={loadingStates["loading"]}
          isLoading={loadingStates["loading"]}
          onClick={formik.handleSubmit}
          type="button"
          className="w-full"
        >
          Reset Password
        </Button>
      </div>
    </>
  );
};

export default ResetPasswordModule;
