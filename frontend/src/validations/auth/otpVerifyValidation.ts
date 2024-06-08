import * as yup from "yup";
export const otpVerifySchema = yup.object({
  otp: yup.string().required("OTP is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email is required"),
});

export interface IOTPVerify extends yup.InferType<typeof otpVerifySchema> {
  isVerifyEmail?: boolean;
}
