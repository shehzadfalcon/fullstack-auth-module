/**
 * Defines the type for the route that updates the password.
 * @param {string} otp - The one-time password (OTP) used for password update.
 * @returns {string} The URL route for updating the password.
 */
type UpdatePasswordRoute = (otp: string) => string;

/**
 * Defines the type for the route that verifies the email.
 * @param {string} email - The email address to be verified.
 * @returns {string} The URL route for verifying the email.
 */
type VERIFY_EMAIL = (email: string) => string;

/**
 * Object containing routes accessible to unauthenticated users.
 * Each route can be either a string representing the URL path or a function generating the URL with parameters.
 */
export const UN_AUTHENTICATED_ROUTES: {
  [key: string]: string | UpdatePasswordRoute | VERIFY_EMAIL;
} = {
  FORGOT_PASSWORD: "/forgot-password", // Forgot password page route
  RESET_PASSWORD: (otp: string) => `/reset-password?otp=${otp}`, // Route for updating password
  VERIFY_EMAIL: (email: string) => `/verify-email?otp_token=${email}`, // Route for email verification
  VERIFY_OTP: (email: string) => `/otp-verify?email=${email}`, // Route for OTP verification
};
