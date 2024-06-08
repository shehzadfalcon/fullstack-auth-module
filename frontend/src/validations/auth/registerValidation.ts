import * as yup from "yup";
export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required")
    .min(3, "Full Name Must be at least 3 characters")
    .max(50, "Full Name Must be at most 50 characters"),
  email: yup.string().trim(),

  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .max(50)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:;"'<>,.?\\/@#])/,
      "Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character"
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
export interface IRegister extends yup.InferType<typeof registerSchema> {}
