import * as yup from "yup";
export const identifySchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid Email format")
    .required("Email is required"),
});

export interface IIndentify extends yup.InferType<typeof identifySchema> {}
