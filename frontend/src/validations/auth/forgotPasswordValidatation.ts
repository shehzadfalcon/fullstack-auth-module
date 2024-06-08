import * as yup from "yup";
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email is required"),
});

export interface IForgotPassword
  extends yup.InferType<typeof forgotPasswordSchema> {}
