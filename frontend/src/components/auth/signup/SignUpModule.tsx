import { useFormik } from "formik";
import React from "react";

import Input from "../../global/forms/Input";
import NiceModal from "@ebay/nice-modal-react";
import { Button } from "../../global/button/Button";
import {
  IRegister,
  registerSchema,
} from "../../../validations/auth/registerValidation";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { authService } from "../../../services/auth.service";
import { errorHandler } from "../../../utils/errorHandler";
import Link from "next/link";

/**
 * SignupModule component handles the sign-up process.
 * It allows users to register with their full name, email, and password.
 * The component includes form validation and submission functionality.
 * @returns {JSX.Element} The JSX element representing the SignupModule component.
 */
const SignupModule = (): JSX.Element => {
  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick(undefined);

  // Formik hook for managing form state and validation
  const formik = useFormik<IRegister>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registerSchema,
    validateOnBlur: true,
    /**
     * Submit handler for the sign-up form.
     * @param {IRegister} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     * @param {Function} setFieldError - Function to set error messages for form fields.
     */
    onSubmit: async (values: IRegister, { resetForm, setFieldError }) => {
      // Handle form submission using debounced click handler
      handleClick(async () => {
        try {
          // Call authentication service to sign up user
          await authService.signupHandler(values);
          // Reset form after successful submission
          resetForm();
          // Display sign-up success modal
          NiceModal.show("signUp", { email: values.email });
        } catch (error: unknown) {
          // Handle form submission error
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
      <legend className="fs-32 mb-10 text-center font-semibold text-white">
        Let’s Create Account
      </legend>
      <div className="mb-8 flex flex-col gap-4">
        <Input
          type="email"
          onKeyDown={handleInputKeyDown}
          name="email"
          formik={formik}
          placeholder={"Email"}
          label="Email"
        />
        <Input
          name="fullName"
          type="text"
          onKeyDown={handleInputKeyDown}
          formik={formik}
          label={"Enter Name"}
          placeholder={"Enter Name"}
          className="text-blackrussian !pr-[50px]"
        />
        <Input
          name="password"
          type="password"
          onKeyDown={handleInputKeyDown}
          formik={formik}
          label={"Enter Password"}
          placeholder={"Enter Password"}
          className="text-blackrussian !pr-[50px]"
        />
        <Input
          type="password"
          formik={formik}
          onKeyDown={handleInputKeyDown}
          name="confirm_password"
          label={"Confirm Password"}
          placeholder={"Confirm Password"}
          className="text-blackrussian !pr-[50px]"
        />
      </div>

      <div className="form-group mb-8 sm:mb-10">
        <Button
          size="lg"
          color="primary"
          className="w-full"
          disabled={loadingStates["loading"]}
          isLoading={loadingStates["loading"]}
          onClick={formik.handleSubmit}
          type="button"
        >
          Sign Up
        </Button>
      </div>
      <div className="form-group text-center">
        <Link href="/login" className="text-sm text-blue-500">
          Already have an account? Login
        </Link>
      </div>
    </>
  );
};

export default SignupModule;
