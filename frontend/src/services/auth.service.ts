// auth.service.ts

// Importing base class

// Importing interfaces

import { IResponse } from "../interfaces/response";
import { IUser } from "../interfaces/user";
import { IForgotPassword } from "../validations/auth/forgotPasswordValidatation";
import { ILogin } from "../validations/auth/loginValidation";
import { IOTPVerify } from "../validations/auth/otpVerifyValidation";
import { IRegister } from "../validations/auth/registerValidation";
import { IResetPassword } from "../validations/auth/resetPasswordValidation";
import { HttpService } from "./base.service";

class AuthService extends HttpService {
  private readonly prefix: string = "auth";

  signupHandler = (data: IRegister): Promise<IResponse> =>
    this.post(`${this.prefix}/register`, data);

  loginHandler = (
    data: ILogin
  ): Promise<IResponse<{ token: string; user: IUser }>> =>
    this.post(`${this.prefix}/login`, data);

  forgotPasswordHandler = (data: IForgotPassword): Promise<IResponse> =>
    this.post(`${this.prefix}/forgot-password`, data);

  resetPasswordHandler = (data: IResetPassword): Promise<IResponse> =>
    this.post(`${this.prefix}/reset-password`, data);

  verifyEmail2FA = (
    data: IOTPVerify
  ): Promise<IResponse<{ token: string; user: IUser; nextStep: string }>> =>
    this.post(`${this.prefix}/verify-email`, data);

  resendOTPHandler = (data: IForgotPassword): Promise<IResponse> =>
    this.post(`${this.prefix}/resend-otp`, data);
}
export const authService = new AuthService();
