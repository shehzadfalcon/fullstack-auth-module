import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { AuthHelperService } from 'src/helper/auth.helper';
import { ILogin } from './interface/login.iterface';
import { EErrorMessages } from 'src/enums/error-messages.enum';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { InjectModel } from 'src/transformers/model.transformer';

import { MongooseModel } from 'src/interfaces/mongoose.interface';
import { VerifyEmailDto } from './dtos/verify-email.dto';

@Injectable()
export class AuthService {
  private selectUserFields: any;
  constructor(
    @InjectModel(User) private readonly userModel: MongooseModel<User>,
    private readonly authHelperService: AuthHelperService,
  ) {
    this.selectUserFields = {
      _id: true,
      email: true,
      fullName: true,
    };
  }

  /**
   * Asynchronously authenticate a user based on the provided login credentials.
   *
   * @param {LoginDto} loginDto - The DTO containing the user's login credentials.
   * @param {string} loginDto.email - The email address of the user.
   * @param {string} loginDto.password - The password associated with the user's account.
   *
   * @returns {Promise<ILogin> } An object containing the status code, message, and payload of the login operation.
   *
   * @throws {Error} Throws an error if the user is not found, the email is not verified, or the password is incorrect.
   */
  async login(loginDto: LoginDto): Promise<ILogin> {
    // Check if a user with the provided email exists
    const user = await this.userModel.findOne(
      { email: loginDto.email.toLowerCase() },
      {
        ...this.selectUserFields,
        password: true,
        emailVerifiedAt: true,
        fullName: true,
        OTPExpireAt: true,
      },
    );

    if (!user) {
      throw new HttpException(
        EErrorMessages.USER_NOT_EXISTS,
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if the user is verified via OTP
    if (!user.emailVerifiedAt) {
      const OTP = this.authHelperService.generateOTP();

      // Generate OTP expiration time
      const OTPExpireAt = this.authHelperService.generateExpiryTime();
      await this.userModel.findOneAndUpdate(
        { _id: user._id },
        {
          OTP,
          OTPExpireAt,
        },
      );

      throw new HttpException(
        EErrorMessages.USER_NOT_VERIFIED,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    // Check Password
    const isCorrect = this.authHelperService.comparePassword(
      loginDto.password,
      user.password || '',
    );

    if (!isCorrect) {
      throw new HttpException(
        EErrorMessages.INVALID_PASSWORD,
        HttpStatus.CONFLICT,
      );
    }

    // generating auth token
    const token = this.authHelperService.generateToken(user);
    //remove pass
    user.password = '';
    return {
      user: {
        _id: String(user._id),
        email: user.email,
        fullName: user.fullName,
      },
      token,
    };
  }

  /**
   * Registers a new user with the provided registration details.
   *
   * @param {RegisterDto} registerDto - The registration details including full name, email, and password.
   * @throws {Error} - Throws an error if there is an issue with user creation or email sending.
   */
  async register(registerDto: RegisterDto) {
    // Check if a user with the same email already exists
    let user = await this.userModel.findOne({ email: registerDto?.email });
    if (user) {
      throw new HttpException(
        EErrorMessages.ACCOUNT_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    // Generate a hashed password
    const hashedPassword = this.authHelperService.hashPassword(
      registerDto.password,
    );

    // Generate a random OTP
    const OTP = this.authHelperService.generateOTP();

    // Generate OTP expiration time
    const OTPExpireAt = this.authHelperService.generateExpiryTime();

    // Create user body with registration details
    const body = {
      fullName: registerDto.fullName,
      email: registerDto.email,
      password: hashedPassword,
      OTP,
      OTPExpireAt,
    };

    // Create the user in the database
    user = await this.userModel.create(body);
    return user;
  }

  /**
   * Verify email.
   *
   * @param {VerifyEmailDto} verifyEmail - DTO containing data for OTP verification.
   * @returns { Promise<ILogin> } - Result of OTP verification.
   */
  async verifyEmail(verifyEmail: VerifyEmailDto): Promise<ILogin> {
    const user = await this.userModel.findOne(
      {
        $and: [
          {
            OTP: Number(verifyEmail.otp),
          },
          {
            email: verifyEmail.email.toLowerCase(),
          },
        ],
      },
      {
        ...this.selectUserFields,
        password: true,
        OTPExpireAt: true,
        emailVerifiedAt: true,
      },
    );

    // send message to user for invalid otp
    if (!user) {
      throw new HttpException(EErrorMessages.INVALID_OTP, HttpStatus.NOT_FOUND);
    }

    // check if otp expires
    if (Date.now() > user?.OTPExpireAt) {
      throw new HttpException(EErrorMessages.OTP_EXPIRED, HttpStatus.CONFLICT);
    }

    // generating auth token
    const token = this.authHelperService.generateToken(user);

    await this.userModel.findOneAndUpdate(
      { _id: user._id },
      {
        emailVerifiedAt: new Date(),
      },
    );

    return {
      user: {
        _id: String(user._id),
        email: user.email,
        fullName: user.fullName,
      },
      token,
    };
  }
  /**
   * @summary Forgot Password
   * @description Service method to handle the "Forgot Password" functionality.
   * @param {ForgotPasswordDto} forgotPassword - The DTO containing user email for password reset.
   * @throws {HttpException} Throws an exception if user is not found, email is not verified, or other relevant EErrorMessages.
   */

  async forgotPassword(forgotPassword: ForgotPasswordDto) {
    let user = await this.userModel.findOne(
      { email: forgotPassword.email },
      { ...this.selectUserFields, emailVerifiedAt: true },
    );

    // send message to user
    if (!user) {
      throw new HttpException(
        EErrorMessages.USER_NOT_EXISTS,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.emailVerifiedAt) {
      throw new HttpException(
        EErrorMessages.USER_NOT_VERIFIED,
        HttpStatus.CONFLICT,
      );
    }

    // generate otp
    const OTP = this.authHelperService.generateOTP();
    const OTPExpireAt = this.authHelperService.generateExpiryTime();

    user = await this.userModel.findOneAndUpdate(
      { _id: user._id },
      {
        OTP,
        OTPExpireAt,
      },
    );
  }

  async resendOTP(resendOTP: ForgotPasswordDto) {
    let user = await this.userModel.findOne(
      { email: resendOTP.email },
      { ...this.selectUserFields, emailVerifiedAt: true, OTPExpireAt: true },
    );

    // send message to user
    if (!user) {
      throw new HttpException(
        EErrorMessages.USER_NOT_EXISTS,
        HttpStatus.NOT_FOUND,
      );
    }

    // generate otp
    const OTP = this.authHelperService.generateOTP();
    const OTPExpireAt = this.authHelperService.generateExpiryTime();

    user = await this.userModel.findOneAndUpdate(
      { _id: user._id },
      {
        OTP,
        OTPExpireAt,
      },
    );
  }
  /**
   * Reset the user's password using the provided OTP (One-Time Password).
   *
   * @param {ResetPasswordDto} resetPassword - The DTO containing the necessary information for password reset.
   * @param {string} resetPassword.otp - The One-Time Password sent to the user's email.
   * @param {string} resetPassword.password - The new password to be set.
   *
   *
   * @throws {Error} Throws an error if the OTP is invalid or expired.
   */
  async resetPassword(resetPassword: ResetPasswordDto) {
    let user;
    if (resetPassword.otp) {
      user = await this.userModel.findOne(
        { OTP: resetPassword.otp },
        {
          ...this.selectUserFields,
          OTPExpireAt: true,
        },
      );
    }
    if (resetPassword.email) {
      user = await this.userModel.findOne(
        { email: resetPassword.email },
        {
          ...this.selectUserFields,
          OTPExpireAt: true,
        },
      );
    }
    // send message to user for invalid otp
    if (!user) {
      throw new HttpException(EErrorMessages.INVALID_OTP, HttpStatus.NOT_FOUND);
    }

    // check if otp expires
    if (Date.now() > user?.OTPExpireAt) {
      throw new HttpException(EErrorMessages.OTP_EXPIRED, HttpStatus.CONFLICT);
    }
    // Generate a hashed password
    const hashedPassword = this.authHelperService.hashPassword(
      resetPassword.password,
    );

    user = await this.userModel.findOneAndUpdate(
      { _id: user._id },
      {
        password: hashedPassword,
      },
    );
  }
}
