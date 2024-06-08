import * as yup from "yup";
export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email is required"),
  password: yup.string(),
});

export interface ILogin extends yup.InferType<typeof loginSchema> {}
