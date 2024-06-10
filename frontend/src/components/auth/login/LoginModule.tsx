import Link from "next/link";
import { useFormik } from "formik";
import React from "react";
import Input from "../../global/forms/Input";
import { Button } from "../../global/button/Button";
import { ILogin, loginSchema } from "../../../validations/auth/loginValidation";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { authService } from "../../../services/auth.service";
import { errorHandler } from "../../../utils/errorHandler";

import { useRouter } from "next/router";
import { HttpService } from "../../../services/base.service";
import { EAUTH_ROUTES } from "../../../enums/routes.enum";

/**
 * LoginModule component handles login functionality with email and password.
 * If an OTP token is present in the URL query params, it sets the email field with the token value.
 * On form submission, it sends a login request to the authentication service,
 * sets the authentication token and cookies upon successful login, and redirects the user to the home route.
 * @returns {JSX.Element} The JSX element representing the LoginModule component.
 */
const LoginModule = () => {
  // Next.js router hook for navigating between pages
  const router = useRouter();

  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick();

  /**
   * Function for handling login.
   * Sends a login request to the authentication service, sets the authentication token and cookies upon successful login,
   * resets the form, and redirects the user to the home route.
   * @param {ILogin} values - The login form values containing email and password.
   * @param {Function} resetForm - Function to reset the form after submission.
   * @param {Function} setFieldError - Function to set field errors in the form.
   * @returns {Promise<void>} A promise representing the login operation.
   */
  const handleLogin = async (
    values: ILogin,
    resetForm: () => void,
    setFieldError: (field: string, message: string | undefined) => void
  ) => {
    try {
      // Send login request to authentication service
      const response = await authService.loginHandler(values);

      // Extract token, full name, email,  from response
      const token: string = response?.payload?.token ?? "";
      const fullName = response?.payload?.user.fullName ?? "";
      const email = response?.payload?.user.email ?? "";

      // Set authentication token and cookies
      HttpService.setToken(token);
      HttpService.setCookie("token", token);
      HttpService.setCookie("fullName", fullName.split(" ").join("_"));
      HttpService.setCookie("email", email);

      // Reset form after successful login
      resetForm();

      // Redirect user to the home route
      let route = EAUTH_ROUTES.HOME as string;
      router.push(route);
    } catch (error: unknown) {
      // Handle error with form field validation
      errorHandler(error, setFieldError);
    }
  };

  // Formik hook for managing form state and submission
  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnBlur: true,
    /**
     * Submit handler for the login form.
     * Calls handleLogin function with form values, resetForm, and setFieldError functions.
     * @param {ILogin} values - Form values.
     * @param {Function} resetForm - Function to reset the form after submission.
     * @param {Function} setFieldError - Function to set field errors in the form.
     */
    onSubmit: async (values: ILogin, { resetForm, setFieldError }) => {
      handleClick(async () => {
        handleLogin(values, resetForm, setFieldError);
      }, "loginPassLoading");
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
          Login
        </legend>
      </div>
      <div className="form-group mb-8">
        <Input
          type="email"
          onKeyDown={handleInputKeyDown}
          name="email"
          formik={formik}
          placeholder={"Email"}
          label="Email"
        />
      </div>
      <div className="form-group relative mb-2">
        <Input
          type="password"
          name="password"
          formik={formik}
          onKeyDown={handleInputKeyDown}
          label={"Enter Password"}
          placeholder={"Enter Password"}
          className="text-blackrussian !pr-[50px]"
        />
      </div>
      <div className="form-group mb-8 flex items-center justify-between pt-2">
        <Link href="/forgot-password" className="text-sm !text-white">
          Forgot Password?
        </Link>
        <Link href="/signup" className="text-sm text-blue-500">
          Dont have an account? Register
        </Link>
      </div>

      <div className="form-group mb-8 sm:mb-10">
        <Button
          size="lg"
          onClick={formik.handleSubmit}
          color="primary"
          isLoading={loadingStates["loginPassLoading"]}
          disabled={loadingStates["loginPassLoading"]}
          className="w-full"
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default LoginModule;
