import * as yup from "yup";
import { otpVerifySchema } from "./otpVerifyValidation";

export interface IAccountLink extends yup.InferType<typeof otpVerifySchema> {
  providerId?: string;
  provider?: string;
}
